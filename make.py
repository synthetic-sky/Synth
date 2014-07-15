import os

print "Synth Build Tool"

os.system ("gcc -o bin/synth -include synth.h synth.c */*.c */*/*.c")

print "Running Test Suite"

os.system ("bin/synth")
