requirejs.define ("io-with-browser", ["express", "http", "socket.io", "path", "routes"], function (express, http, socketio, path, routes)
{
  function IO_with_browser (controller)
  {
    var IO = this;
    
    IO.controller = controller;
    IO.sockets = [];
    
    IO.router = express ();
    IO.server = http.createServer (IO.router);
    IO.io     = socketio.listen (IO.server);
    
    IO.sessionBySocket = {};
    
    IO.io.on ('connection', function (socket)
    {
      sockets.push (socket);
    
      socket.on ('disconnect', function () 
      {
        sockets.splice (IO.sockets.indexOf (socket), 1);
        var session = IO.sessionBySocket [socket.id]
    	  suspend_session_soon (session);
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
  
          broadcast ('message', data);
          messages.push (data);
        });
      });
    
      socket.on ('synth_client_init', function (name)
      {
        console.log ("synth_client_init received")
        
        var session = IO.sessionBySocket [socket.id] = open_session ();
        
        console.log ("session was opened")
        
        socket.set ('session.id', session.id, function (err) {
          console.log ("set session.id to " + name);
        })
      });
    });
  
    function broadcast (event, data) {
      sockets.forEach (function (socket) {
        socket.emit (event, data);
      });
    }
    
    IO.server.listen (process.env.PORT || 3000, process.env.IP || "0.0.0.0", function (){
      var addr = IO.server.address ();
      console.log ("Chat IO.server listening at", addr.address + ":" + addr.port);
    });
    
    routes.register (IO.router);
  }
  
  IO_with_browser.prototype.send = function io_with_browser_send () {
    console.log ("would send")
  }
  
  return {
    IO: IO_with_browser
  };
});