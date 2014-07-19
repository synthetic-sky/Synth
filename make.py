#!/usr/bin/python

import os
import os.path
import sys

# import subprocess
# import 

def say(msg):
	""" py3-compatible echo """
	sys.stdout.write(msg + "\n")

say ("Synth Build Tool")

MAKE_TOOLS_DIR = os.path.join ("tools", "make")

if not os.path.exists (".git/.setup_done"):
	say ("Looks like a fresh checkout - setting up..")
	for fn in os.listdir (MAKE_TOOLS_DIR):
		if fn.startswith ("setup_"):
			script = os.path.join (MAKE_TOOLS_DIR, fn)
			os.system (script)

SYNTH_EXECUTABLE = os.path.join ("bin", "synth")

if os.path.exists (SYNTH_EXECUTABLE):
	os.unlink (SYNTH_EXECUTABLE)

# os.system ("gcc -o bin/synth -lm -include synth.h synth.c */*.c */*/*.c")

os.system ("make -f tools/make/Makefile")

if os.path.exists (SYNTH_EXECUTABLE):

	say ("Running Test Suite")

	os.system (SYNTH_EXECUTABLE)

else:

	say ("Build Failed")

	sys.exit (1)
