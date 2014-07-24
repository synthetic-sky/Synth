console.log ("init.js was loaded")

require.config ({
  baseUrl: "/client", 
  shim: {
    "socket.io": {
      exports: "io"
    }
  },
  paths: {
    "socketio": "../node_modules/socket.io/node_modules/socket.io-client/socket.io",
    "react": "../node_modules/react/dist/react-with-addons",
    "jsx": "ext/jsx",
    "text": "ext/text",
    "JSXTransformer": "ext/JSXTransformer-mod"
  },
  waitSeconds: 10
});

require (["socketio", "client"], function (socket_io, client) {
  var socket = socket_io ('http://localhost');
  socket.on ('synth_init', function (data) {
    console.log (data);
    socket.emit ('synth_client_init', { version: "0.0.0", status: "ok" });
  }); 
});