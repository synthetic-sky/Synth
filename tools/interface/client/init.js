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
    "jsx": "ext/jsx",
    "text": "ext/text",
    "JSXTransformer": "ext/JSXTransformer-mod",
  },
  waitSeconds: 10
});

require ([
  "logic/init" , "common/space", "ui/init", "io/init", "io/loader"], 
    function (logic, space, ui, io, loader)
    {
      // initialise the global application space
      var app = window.AppSpace = new space.Space ();
      
      // initialise the three main sub-components
      logic.init (app);
      ui.init (app);
      io.init (app);
      
      // check that everything went ok
      if (! (app.manager && app.model_mutator))
        return console.error ("something wrong with logic.init");
      if (! (app.view && app.view_mutator))
        return console.error ("something wrong with ui.init");
      if (! (app.loader && app.io))
        return console.error ("something wrong with io.init");
        
      console.log ("init.js done")
      
      app.io.emit ("!load", {path: "graph:541242"}, function (reply) { console.log ("received reply for !load:", reply)})
});