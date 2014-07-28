console.log ("init.js was loaded")

require.config ({
  baseUrl: "/client", 
  shim: {
    "socket_io": {
      exports: "io"
    }
  },
  paths: {
    "socket_io": "../node_modules/socket.io/node_modules/socket.io-client/socket.io",
    "jquery": "ext/jquery",
    "react": "../node_modules/react/dist/react-with-addons",
    "pouchdb": "ext/pouchdb",
    "jsx": "ext/jsx",
    "text": "ext/text",
    "JSXTransformer": "ext/JSXTransformer-mod",
    "underscore": "../node_modules/underscore/underscore",
  },
  waitSeconds: 10
});

function load_apps (apps) {
  require.config ({
    baseUrl: '/client/apps' // we promise to only load apps from now on?
  });
  
  apps.forEach (function (name) {
    require ([name + "/init"], function (plugin_app) {
      if (plugin_app)
        console.log ("app", name, "loaded ok")
      else
        console.error ("app", name, "failed to load")
      
      // stub
      if (name == "frame")
      {
        var app = window.theApp, Frame = plugin_app;
        
        app.frame = new Frame (app);
        // app.frame.view.render ({
        //   render_target: document.body,
        //   render_data: { data: "fake data" },
        // });
      }
    })  
  });
}

require (["underscore", "common/app.base", "logic/init", "ui/init", "io/init", "io/loader", "common/client_ident", "pouchdb"], 
    function (util, app_base, logic, ui, io, loader, ident, PouchDB)
    {
      // use underscore as a source of helper routines
      window.util = window._;
      
      // initialise unique-ident manager before we do anything else
      // app.client_ident = new client_ident.ClientIdentManager (app);
      
      // initialise the global application
      var app = window.theApp = new app_base.AppBase ();
      
      // initialise the three main sub-components
      logic.init (app);
      ui.init (app);
      io.init (app);
      
      app.Pouch = new PouchDB ('sessions');
      
      app.initial_load_done = true;
      
      load_apps (["frame", "history", "sessions"]);
      
      // check that everything went ok
      if (! (app.manager && app.model_mutator))
        return console.error ("something wrong with logic.init");
      if (! (app.view && app.view_mutator))
        return console.error ("something wrong with ui.init");
      if (! (app.loader && app.io))
        return console.error ("something wrong with io.init");
        
      // ident.load_ident ();
        
      console.log ("init.js done")
            
      
    //  app.io.emit ("!put", {path: "session:test-id2", data: { x: 10, y: 21 }}, function (reply) { console.log ("received reply for !put:", reply)})

     // app.io.emit ("!load", {path: "session:test-id2"}, function (reply) { console.log ("received reply for !load:", reply)})
});