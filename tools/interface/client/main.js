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
    "ace": "ext/ace",
    // "code-mirror": "../ext/requirejs-codemirror/src/code-mirror"
  },
  waitSeconds: 10,
  
  // requirejs-codemirror config:
  cm: {
    baseUrl: '../node_modules/codemirror/',
    path: 'lib/codemirror',
    css: 'node_modules/codemirror/lib/codemirror.css',
    themes: {
        monokai: '/path/to/theme/monokai.css',
        ambiance: '/path/to/theme/ambiance.css',
        eclipse: '/path/to/theme/eclipse.css'
    },
    modes: {
      path: 'mode/{mode}/{mode}'
    }
  },
});

function load_apps (apps) {
  require.config ({
    baseUrl: '/client/apps' // we promise to only load apps from now on?
  });
  
  apps.forEach (function (name) {
    require ([name + "/init"], function (plugin_app) {
      if (plugin_app)
        console.log ("app", name, "loaded ok");
      else
        console.error ("app", name, "failed to load");
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
        
      console.log ("init.js done");
});