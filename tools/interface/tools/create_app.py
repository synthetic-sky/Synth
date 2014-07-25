#!/usr/bin/python

import os
import os.path
import sys

def create (*files):
  for fn in files:
    open (fn, "a") .close ()

def mkdir (path):
  if not os.path.exists (path):
    os.makedirs (path)
    
if __name__ == '__main__':

  path = sys.argv [1]
  
  mkdir (path)
  os.chdir (path)
  
  create ("package.json", "init.js")
  
  mkdir ("docs")
  os.chdir ("docs")
  create ("API.md", "Internal.md")
  os.chdir ("..")
  
  mkdir ("ui")
  os.chdir ("ui")
  create ("init.js", "receiver_to_dom.js", "dom_to_controller.js", "requirements.json")
  mkdir ("assets")
  os.chdir ("..")
  
  mkdir ("logic")
  os.chdir ("logic")
  create ("init.js", "receiver.js", "controller.js", "model.js", "requirements.json")
  os.chdir ("..")
