#!/usr/bin/python

import os
import os.path
import sys

def create_pkg_init ():
  pkg = os.path.basename (os.path.abspath ("."))
  with open ("init.js", "w") as f:
    f.write (
"""define ("%s", ["logic/init", "logic/reactor", "logic/controller", "logic/model", "ui/init", "ui/up", "ui/down"], function (logic, reactor, controller, model, ui, up, down)
{
  function %s (config)
  {
    var app = { global: config.global };

    logic.init (app);

    app.reactor   = new reactor.Reactor ();
    app.controller = new controller.Controller ();
    app.model      = new model.Model ();

    if (! config.headless)
    {
      ui.init (app);

      app.ui_up = new up.Up (app);
      app.ui_down = new down.Down (app);
    }
  }

  return {
    %s: %s
  };
});
""" % (pkg, pkg.title (), pkg.title (), pkg.title()))
def create (*files):
  for fn in files:
    if not os.path.exists (fn) and fn.endswith (".js"):
      part = fn [:-3]
      folder = os.path.basename (os.path.abspath ("."))
      with open (fn, "w") as f:
        f.write (
"""define ("%s", [], function ()
{
  function %s (local) {
    var %s = this;
    %s.local = local;
    %s.global = AppSpace;
  }
  
  return {
    %s: %s
  };
});
""" % (part, part.title (), part, part, part, part.title (), part.title()) if fn not in ["init.js"] else
"""define ("init", [], function ()
{
  function init (local) {
    var %s = this;
    %s.local = local;
    %s.global = AppSpace;
  }
  
  return {
    init: init
  };
});
""" % (folder, folder, folder))
    else:
      open (fn, "a") .close ()

def mkdir (path):
  if not os.path.exists (path):
    os.makedirs (path)
    
if __name__ == '__main__':

  path = sys.argv [1]
  
  mkdir (path)
  os.chdir (path)
  
  mkdir ("docs")
  os.chdir ("docs")
  create ("API.md", "Internal.md")
  os.chdir ("..")
  
  mkdir ("ui")
  os.chdir ("ui")
  create ("up.js", "down.js", "requirements.json", "init.js")
  mkdir ("assets")
  os.chdir ("..")
  
  mkdir ("logic")
  os.chdir ("logic")
  create ("reactor.js", "controller.js", "model.js", "requirements.json", "init.js")
  os.chdir ("..")
  
  create ("package.json")
  if not os.path.exists ("init.js"):
    create_pkg_init ()
