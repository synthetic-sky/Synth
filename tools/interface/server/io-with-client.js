requirejs.define ("io-with-client", ["express", "http", "socket.io", "path", "routes"], function (express, http, socketio, path, routes)
{
  function IO_with_client (controller)
  {
    var IO = this;
    
    IO.controller = controller;
    IO.sockets = [];
    IO.plugins = [];
    
    IO.router = express ();
    IO.server = http.createServer (IO.router);
    IO.io     = socketio.listen (IO.server);
    
    IO.sessionBySocket = {};
    
    IO.io.on ('connection', function (socket)
    {
      IO.sockets.push (socket);
    
      socket.on ('disconnect', function () 
      {
        IO.sockets.splice (IO.sockets.indexOf (socket), 1);
        var session = IO.sessionBySocket [socket.id];
    	  // suspend_session_soon (session);
      });
    
      socket.on ('message', function (msg) 
      {
        var text = String (msg || '');
    
        if (!text)
          return;
  
        socket.get ('name', function (err, name) {
          var data = {
            name: name,
            text: text
          };
        });
      });
    
      socket.on ('synth_client_init', function (name)
      {
        console.log ("synth_client_init received");
        
        var session = IO.sessionBySocket [socket.id] = open_session ();
        
        console.log ("session was opened");
        
        socket.set ('session.id', session.id, function (err) {
          console.log ("set session.id to " + name);
        });
      });
      
      IO.register_plugins_with_socket (socket);
    });

    
    IO.server.listen (process.env.PORT || 3000, process.env.IP || "0.0.0.0", function (){
      var addr = IO.server.address ();
      console.log ("Spiffy HTTP.server listening at", addr.address + ":" + addr.port);
    });
    
    routes.register (IO.router);
  }
  
  IO_with_client.prototype.send = function io_with_client_send () {
    console.log ("would send");
  };
  
  IO_with_client.prototype.register_plugins_with_socket = function io_register_plugins_with_socket (socket) {
    var IO = this;
    
    IO.plugins.forEach (function (plugin) {
      console.log (plugin)
      if (! plugin.events)
        console.error ("cannot register plugin <" + plugin.name + "> with socket - no .events dict found")
      else
      {
        for (event in plugin.events)
        {
          var handler = plugin.events [event];
          socket.on (event, handler);
        }
      }
    });
    
  };
  
  IO_with_client.prototype.register_plugin = function io_register_plugin (name, events) {
    var IO = this;
    
    IO.plugins.push ({
      name: name,
      events: events
    });
  };
  
  return {
    IO: IO_with_client
  };
});