#!/usr/bin/python

import sys
import parser_core as grako_parser
import json

def parse_code (code):
  parser = grako_parser.pathwayParser ()
  ast = parser.parse (code)
  return ast
  
def output (ast):
  sys.stdout.write (json.dumps (ast))
  
def usage ():
  sys.stderr.write ("""Usage:\n\tpython tools/parser.py -f </path/to/file>\n\tpython tools/parser.py -c "<code>"\n""")
  
if __name__ == '__main__':

  # check we have the right number of inputs
  #  among other things, bad quote-escaping might provide more
  if len (sys.argv) != 3:
    sys.stderr.write ("want two arguments, but have %i\n" % (len (sys.argv) - 1))
    usage ()
    sys.exit (1)
  
  # parse the CLI arguments
  flag, param = sys.argv [1:3]
  
  if flag == "-c":
    ast = parse_code (param)
  elif flag == "-f":
    with open (param) as f:
      ast = parse_code (f.read ())
  else:
    print "want one of -c or -f, but have '%s'" % flag
    usage ()
    sys.exit (1) # unable to parse - don't know what to parse
  
  output (ast)