#!/usr/bin/python

import os
import os.path

print "Synth Build Tool"

os.system ("rm -f bin/synth")

# os.system ("gcc -o bin/synth -lm -include synth.h synth.c */*.c */*/*.c")

os.system ("make -f tools/make/Makefile")

if os.path.exists ("bin/synth"):

	print "Running Test Suite"

	os.system ("bin/synth")

else:

	print "Build Failed"
