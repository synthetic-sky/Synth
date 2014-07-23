import sys
import os
import os.path

assert os.path.exists ("./synth.c"), "tools must be invoked from the root of the repo"


path = "./docs/docco/"

if not os.path.exists (path):
	os.mkdir (path)

docco = ["ext", "node_modules", "docco", "bin", "docco", "-o", path]


import sh
import subprocess

for file in sh.find (".", "-name", "*.c"):
	subprocess.check_call (docco + [file])
