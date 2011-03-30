#!/usr/bin/env python
"""
 Author: Zeuxis Lo <http://zeuxis.me/>
 Create: 03/30/11 11:28:16
"""

import os, threading, time, sys, signal, time, optparse, zipfile, subprocess

try:
	from jsmin import jsmin
except ImportError:
	sys.path.append('lib')
	from jsmin import jsmin

def merge_to_content_js():
	header = open("./core/header.js").read().strip()
	helper = open("./core/helper.js").read().strip()
	booter = open("./core/booter.js").read().strip()
	
	header = header.replace("{MODIFIED_TIME}", time.strftime("%Y-%m-%d %H:%M:%S"))
	
	site = "\n".join([open("./site/" + file_name, 'r').read().strip() for file_name in os.listdir("./site") if file_name.endswith(".js") is True])
	
	content = open("./build/content.js", 'w')
	content.write('\n'.join([header, helper, site, booter]))
	content.close()
	
def recursive_zip(zipf, directory, folder = ""):
	for item in os.listdir(directory):
		print("  adding: %s" % str(item))
		if os.path.isfile(os.path.join(directory, item)):
			zipf.write(os.path.join(directory, item), folder + os.sep + item)
		elif os.path.isdir(os.path.join(directory, item)):
			recursive_zip(zipf, os.path.join(directory, item), folder + os.sep + item)

class Build(threading.Thread):
	def __init__(self, path):
		threading.Thread.__init__(self)
		
		self.all_files_modified_time = {}
		self.path = path

	def fetch_modified_time(self):
		old_all_files_modified_time = self.all_files_modified_time

		for root, dirs, files in os.walk(self.path):
			for name in files:
				if name[:1] != ".":
					if name not in self.all_files_modified_time:
						merge_to_content_js()
						
						print("[added] %s" % name)
						
					self.all_files_modified_time[name] = os.path.getmtime(os.path.join(root, name))

	def remove_deleted_file(self):
		for file_name, old_time in self.all_files_modified_time.items():
			file_path = os.path.realpath(self.path + "/" + file_name)
			
			if os.path.isfile(file_path) is False:
				del self.all_files_modified_time[file_name]
				
				merge_to_content_js()
				
				print("[deleted] %s" % file_name)

	def run(self):
		self.fetch_modified_time()
	
		while True:
			for file_name, old_time in self.all_files_modified_time.items():
				file_path = os.path.realpath(self.path + "/" + file_name)
				
				if os.path.isfile(file_path) is True:
					new_time = os.path.getmtime(file_path)
		
					if (new_time > old_time):
						print("[Changed] %s (%s)" % (file_name, time.strftime("%H:%M:%S",time.localtime(new_time))))
						merge_to_content_js()
						
				self.fetch_modified_time()
				self.remove_deleted_file()
				
			time.sleep(1)

class Watcher:
	def __init__(self):
		self.child = os.fork()
		
		if self.child == 0:
			return
		else:
			self.watch()
	
	def watch(self):
		try:
			os.wait()
		except KeyboardInterrupt:
			print('\nExit...')
			self.kill()

		sys.exit()
		
	def kill(self):
		try:
			os.kill(self.child, signal.SIGKILL)
		except OSError:
			pass

if __name__ == "__main__":
	parser = optparse.OptionParser(usage="Usage: %prog [options]")
	parser.add_option("-c", "--compress", action="store_true", dest="compress", help="compress content.js")
	parser.add_option("-m", "--merge", action="store_true", dest="merge", help="merge into content.js")
	parser.add_option("-o", "--observe", action="store_true", dest="observe", help="observe file status and merge into content.js automatically")
	parser.add_option("-z", "--zip", action="store_true", dest="zip", help="Zip the build folder to build.zip")
	
	(options, args) = parser.parse_args()
	
	if options.compress:
		content_file = "./build/content.js"
		
		if os.path.isfile(content_file) is True:
			content = jsmin(open(content_file, "r").read())

			f = open(content_file, "w")
			f.write(content)
			f.close()
			
			print("Compressed content.js")
		else:
			print("Not found content.js")
	elif options.merge:
		merge_to_content_js()
		print("Merged all file into content.js on build folder")
	elif options.observe:
		Watcher()
		print("Started...")
		Build("./core").start()
		Build("./site").start()	
	elif options.zip:
		file_id = time.strftime("%Y.%m.%d.%H.%M", time.localtime())
		zip_name= file_id + ".zip"
		
		if os.name == "posix":
			print("*Unix...zip...")
			result = subprocess.Popen("zip " + zip_name + " ./build/*", shell=True, stdout=subprocess.PIPE)
			(stdout, stderr) = result.communicate()
			print(stdout)
		else:
			print("Window...zip...")
			zipf = zipfile.ZipFile(zip_name, "w", compression=zipfile.ZIP_DEFLATED)
			recursive_zip(zipf, "./build")
			zipf.close()
	else:
		parser.print_help()