var requirejs = require ("requirejs");

requirejs.config ({
  baseUrl: "server/",
  paths: {
    "client": "../client"
  },
  nodeRequire: require
})

requirejs (["io-with-client", "io-with-synth", "controller", "receiver", "plugins/sessions", "plugins/loader"], 
  function (io_with_client, io_with_synth, controller, receiver, plugin_sessions, plugin_loader)
{
  var server = Object.create (null);
  
  server.io_with_client = new io_with_client.IO ();
  server.io_with_synth = new io_with_synth.IO ();
  server.ctrl = new controller.Controller ();
  server.react = new receiver.Receiver ();
  
  global.server = server;
  
  var plugins = [plugin_sessions, plugin_loader];
  
  server.io_with_client.register_plugin ("sessions", plugin_sessions.events)
  server.io_with_client.register_plugin ("loader", plugin_loader.events);
})