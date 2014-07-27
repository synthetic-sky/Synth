define ("common/app.base", ["underscore"], function (util, client_ident)
{
  function AppBase () {
    var app_base = this;
    // app_base.registry = Object.create (null);
    app_base.registry = app_base;
    app_base.uid = app_base.UID ();
  }
  
  AppBase.prototype.register = function app_base_register (config) {
    var app_base = this;
    if (config.name in app_base.registry)
      return console.error ("cannot register " + config.name + "; the name is already taken");
    app_base.registry [config.name] = config;
  };
  
  AppBase.prototype.events = function app_base_events (obj, map) {
    var app_base = this;
    for (var event in map)
    {
      var handler = map [event];
      var handler_name = "on_" + event;
      if (handler_name in app_base.registry)
        return console.error ("cannot register " + handler_name + "; the name is already taken");
      app_base.registry [handler_name] = handler.bind (obj);
    }
  };
  
  AppBase.prototype.invoke = function app_base_invoke (type, headless) {
    var app_base = this;
    var uid = app_base.UID ();
    
    //! this seems to assume that all types have already been loaded
    
    // var app = app_base.registry [type] .create (uid, headless);
    
    // app.uid = uid;
    // app_base.registry [uid] = app;
    
    // return app;
    
    //: alternative: return a promise of the app ?
    var app_type_promise = app_base.registry [type] ? app_base.registry [type] : app_base.load_app (type);
    
    return app_type_promise.then (function (app_type)
    {
      console.assert (! (type in app_base.registry));
      app_base.registry [type] = app_type;
      var app = new app_type (); //! app_type needs to be the main class for this to work
      app.uid = app_base.UID ();
      app_base.registry [app.uid] = app;
      return app;
    });
    
    // ... async by default ?
  };
  
  AppBase.prototype.load_app = function app_base_load_app (name) {
    var app_base = this;
    
    if (! app_base.initial_load_done)
    {
      return new Promise (function (resolve, reject) {
        var waited = 0;
        var interval = setInterval (function () {
          if (app_base.initial_load_done)
          {
            clearInterval (interval);
            resolve (app_base.load_app (name));
          }
          else if (waited++ > 40)
            reject ("AppBase.load_app: waited 2 seconds, but the app <" + name + "> failed to load.");
        }, 50);
      });
    }
    else
    {
      return new Promise (function (resolve, reject) {
        require (name + "/init", function (the_loaded_app) {
          if (the_loaded_app)
            resolve (the_loaded_app);
          else
            reject ("AppBase.load_app: was unable to find the app @<" + name + "/init>");
        });
      });
    }
  };
  
  AppBase.prototype.invoke_headless = function app_base_invoke_headless (type, message) {
    var app_base = this;
    return app_base.invoke (type, true);
  };
  
  AppBase.prototype.call = function app_base_call (instance, api, message) {
    var app_base = this;
    app_base.registry [instance] [api] (message);
  };
  
  AppBase.prototype.send = function app_base_send (instance, message) {
    var app_base = this;
    app_base.registry [instance] .got_mail (message);
  };
  
  AppBase.prototype.forget = function app_base_unregister (uid) {
    var app_base = this;
    delete app_base.registry [uid];
  };
  
  AppBase.prototype.on = function app_base_subscribe_to_event (event, handler) {
    var app_base = this;
    if (! (event in app_base.registry))
      app_base.registry [event] = [handler];
    else
      app_base.registry [event] .push (handler);
  };
  
  AppBase.prototype.emit = function app_base_emit_event (event, details) {
    var app_base = this;
    if (event in app_base.registry)
      app_base.registry.forEach (function (handler) {
        handler (details);
      });
  };
  
  AppBase.prototype.UID = function app_base_uid () {
    return "uid:" + (Math.random () + "") .slice (2) + (Math .random () + "") .slice (2);
    // return util.uniqueId (this.global.client_ident.get_client_id () + ":");
  };
  
  return {
    AppBase: AppBase
  };
});