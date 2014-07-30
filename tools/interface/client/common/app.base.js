define ("common/app.base", ["underscore"], function (util, client_ident)
{
  function AppBase () {
    var app_base = this;
    app_base.event_registry = Object.create (null);
    app_base.event_queue = Object.create (null);
    app_base.uid = app_base.UID ();
  }
  
  AppBase.type_registry = Object.create (null);
  AppBase.instance_registry = Object.create (null);
  
  AppBase.prototype.register = function app_base_register_shortcut (name, app) {
    var app_base = this;
    if (name in app_base)
      return console.error ("cannot register " + name + "; the name is already taken");
    console.assert (app);
    app_base [name] = app;
  };
  
  AppBase.prototype.events = function app_base_events (obj, map) {
    var app_base = this;
    
    for (var event in map)
    {
      var handler = map [event];
      
      if (event in app_base.event_registry)
        app_base.event_registry [event] .push (handler.bind (obj));
      else
        app_base.event_registry [event] = [handler.bind (obj)];
    }
  };
  
  AppBase.prototype.invoke = function app_base_invoke (type, headless) {
    var app_base = this;
    
    //! this seems to assume that all types have already been loaded
    
    //: alternative: return a promise of the app ?
    
    if (AppBase.type_registry [type])
    {
      console.assert (! AppBase.type_registry [type] .uid);
      
      return new Promise (function (resolve, reject) {
        resolve (spawn_app (AppBase.type_registry [type]));
      });
    }
    else
    if (AppBase.type_registry [type] === null)
      return console.error ("app_base.invoke.2 nyi - should return promise");
    else
      AppBase.type_registry [type] = null; // don't load twice
      
    return app_base.load_app (type) .then (function (app_type)
    {
      console.assert (! AppBase.type_registry [type]);
      
      AppBase.type_registry [type] = app_type;
      
      return spawn_app (app_type);
    });
    
    function spawn_app (app_type) {
      var app = new app_type (app_base);
      
      app.uid = app_base.UID ();
      AppBase.instance_registry [app.uid] = app;
      
      return app;
    }
    
    // ... async by default ?
  };
  
  AppBase.prototype.load_app = function app_base_load_app (name) {
    var app_base = this.global || this;
    
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
        require ([name + "/init"], function (the_loaded_app) {
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
  
  AppBase.prototype.send = function app_base_call (uid, api, message) {
    var app_base = this;
    var instance = AppBase.instance_registry [uid];
    var method = instance && instance [api];
    if (instance && method)
      method.call (instance, message);
    else
      console.error ("failed to invoke", uid, api, "with argument", message);
  };
  
  AppBase.prototype.forget = function app_base_unregister (uid) {
    var app_base = this;
    delete AppBase.instance_registry [uid];
  };
  
  AppBase.prototype.on = function app_base_subscribe_to_event (event, handler) {
    var app_base = this;
    
    /*
     * The registry contains entries for each event.
     *
     * ! This should really be its own .event_registry - to avoid naming conflicts.
    */
    
    if (event in app_base.event_registry)
      app_base.event_registry [event] .push (handler);
    else
      app_base.event_registry [event] = [handler];
      
    /*
     * Events are queued by .emit (and more explicitly, by it's alias .queue)
     *   whenever no handler has yet been registered.
     *
     * This is especially useful when the loading order is not clear,
     *   and an expected subscriber might not yet have been loaded.
     *
     * It does however require that no handlers are registered that are not
     *   ready to be called immediately. This *might* be an ok trade-off..
     *
    */
    
    app_base.process_event_queue (event);
  };
  
  AppBase.prototype.process_event_queue = function app_base_process_event_queue (event)
  {
    var app_base = this;
    if (event in app_base.event_queue && event in app_base.event_registry)
    {
      app_base.event_queue [event] .forEach (function (details) {
        app_base.event_registry [event] .forEach (function (handler) {
          handler (details);
        });
      });
      delete app_base.event_queue [event];
    }
  }
    
  AppBase.prototype.emit = function app_base_emit_event (event, details) {
    var app_base = this;
    if (event in app_base.event_registry && ! app_base.event_registry [event] .blocked)
    {
      app_base.process_event_queue (event);
      
      app_base.event_registry [event] .forEach (function (handler) {
        handler (details);
      });
    }
    else
      if (event in app_base.event_queue)
        app_base.event_queue [event] .push (details);
    else
      app_base.event_queue [event] = [details];
  };
  
  AppBase.prototype.queue = AppBase.prototype.emit
  AppBase.prototype.trigger = AppBase.prototype.emit;
  
  AppBase.prototype.block = function app_base_block_event (event) {
    var app_base = this;
    if (event in app_base.event_registry)
      app_base.event_registry [event] .blocked = true;
    return util.partial (app_base.unblock.bind (app_base), event);
  }
  
  AppBase.prototype.unblock = function app_base_unblock_event (event, last_only) {
    var app_base = this;
    app_base.event_registry [event] .blocked = false;
    if (last_only && event in app_base.event_queue)
      app_base.event_queue [event] .splice (0, app_base.event_queue [event] .length - 1);  
    app_base.process_event_queue (event);
  };
  
  AppBase.prototype.emitter = function (event_name)
  {
    var app_base = this;
    
    return function (event_data) {
      app_base.queue (event_name, event_data);
    };
  };
  
  AppBase.prototype.UID = function app_base_uid () {
    return "uid:" + (Math.random () + "") .slice (2) + (Math .random () + "") .slice (2);
    // return util.uniqueId (this.global.client_ident.get_client_id () + ":");
  };
  
  return {
    AppBase: AppBase
  };
});