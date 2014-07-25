var requirejs = require ("requirejs");

requirejs.config ({
  baseUrl: "server/",
  paths: {
    "client": "../client"
  },
  nodeRequire: require
})

requirejs (["io-with-browser", "io-with-synth", "controller", "receiver", "sessions"], 
  function (io_with_browser, io_with_synth, controller, receiver, sessions)
{
  var ui    = new io_with_browser.IO ();
  var synth = new io_with_synth.IO ();
  var session_store = new sessions.SessionStore
  var ctrl = new controller.Controller ();
  var react = new receiver.Receiver ();
  
  ui.send ("hi", {})
})