#!/usr/bin/python

import os
import os.path
import sys

# global package, package_dict

template_folder = os.path.join (os.path.dirname (os.path.realpath (__file__)), "app_template")

def load_template (name):
  with open (os.path.join (template_folder, "%s.template" % name)) as f:
    return f.read ()

def write_file (name, file):
  if os.path.exists (name):
    print "not overwriting %s" % os.path.abspath (name)
  with open (name, "w") as f:
    f.write (file)

def create_logic_init ():
  write_file ("init.js", load_template ("logic.init") % package_dict)

def create_logic_manager ():
  write_file ("manager.js", load_template ("logic.manager") % package_dict)

def create_ui_view ():
  write_file ("view.js", load_template ("ui.view") % package_dict)

def create_ui_mutator ():
  write_file ("view.mutator.js", load_template ("ui.view.mutator") % package_dict)
  
def create_ui_init ():
  write_file ("init.js", load_template ("ui.init") % package_dict)

def create_pkg_init ():
  pkg = os.path.basename (os.path.abspath ("."))
  tmpl = load_template ("main.init")
  write_file ("init.js", tmpl % {
    "PKG": package, 
    "PKG_tc": package.title ()
  })

def create (*files):
  for fn in files:
    if not os.path.exists (fn) and fn.endswith (".js"):
      basename = fn [:-3]
      sub_package = os.path.basename (os.path.abspath ("."))
      tmpl = load_template ("default")
      write_file (fn, tmpl % { 
        "PKG": package, 
        "PKG_tc": package .title () .replace ("_", "") .replace (".", ""),
        "SUB_PKG": sub_package .replace (".", ""),
        "MOD": basename,
        "VAR": basename .replace (".", "_"), 
        "VAR_tc": basename .title () .replace ("_", "") .replace (".", "")
      })
    else:
      open (fn, "a") .close () # non-js files

def mkdir (path):
  if not os.path.exists (path):
    os.makedirs (path)
    
def create_pkg (path):

  global package, package_dict
  
  curdir = os.getcwd ()

  mkdir (path)
  os.chdir (path)
  
  package = os.path.basename (os.path.abspath ("."))
  package_dict = { "PKG": package }
  
  mkdir ("docs")
  os.chdir ("docs")
  mkdir ("developer")
  os.chdir ("developer")
  create ("Events.md", "API.md", "Intro.md")
  os.chdir ("..")
  mkdir ("user")
  os.chdir ("..")
  
  mkdir ("ui")
  os.chdir ("ui")
  create_ui_mutator ()
  create_ui_view ()
  create_ui_init ();
  create ("view.events.js", "requirements.json")
  mkdir ("assets")
  os.chdir ("..")
  
  mkdir ("logic")
  os.chdir ("logic")
  create_logic_init ();
  create_logic_manager ()
  create ("model.mutator.js", "model.js", "requirements.json")
  os.chdir ("..")
  
  create ("package.json", "README.md")

  create_pkg_init () # must be called last
  
  os.chdir (curdir) # reset, in case we are called multiple times

if __name__ == '__main__':

  for path in sys.argv [1:]:
    create_pkg (path)