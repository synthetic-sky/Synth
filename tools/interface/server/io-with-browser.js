requirejs.define ("io-with-browser", ["express", "http", "socket.io", "path"], function (express, http, socketio, path)
{
  function IO_with_browser (controller)
  {
    var IO = this;
    
    IO.controller = controller;
    IO.sockets = [];
    
    IO.router = express ();
    IO.server = http.createServer (IO.router);
    IO.io     = socketio.listen (IO.server);
      
    IO.router.use (express.static (path.resolve ("..", 'client')));
    
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
    
    IO.router.get ('/', function (req, res) {
        res.sendfile ('client/client.html');
    })
    
    IO.router.get ('/client/buttons.css', function (req, res) {
        res.sendfile ('client/buttons.css');
    })
    
    IO.router.get ('/client/client.css', function (req, res) {
        res.sendfile ('client/client.css');
    })
    
    IO.router.get ('/client/client.js', function (req, res) {
        res.sendfile ('client/client.js');
    })
    
    IO.router.get ('/client/views/main.js', function (req, res) {
        res.sendfile ('client/views/main.jsx');
    })
    
    IO.router.get ('/client/init.js', function (req, res) {
        res.sendfile ('client/init.js');
    })
    
    IO.router.get ('/client/interface.js', function (req, res) {
        res.sendfile ('client/interface.js');
    })
    
    IO.router.get ('/client/frame.js', function (req, res) {
        res.sendfile ('client/frame.js');
    })
    
    IO.router.get ('/client/jquery.js', function (req, res) {
        res.sendfile ('client/jquery.js');
    })
    
    // IO.router.get ('/node_modules/react/dist/JSXTransformer.js', function (req, res) {
    //     res.sendfile ('node_modules/react/dist/JSXTransformer.js');
    // })
    
    IO.router.get ('/client/ext/text.js', function (req, res) {
        res.sendfile ('client/ext/text.js');
    })
    
    IO.router.get ('/client/ext/jsx.js', function (req, res) {
        res.sendfile ('client/ext/jsx.js');
    })
    
    IO.router.get ('/client/ext/JSXTransformer-mod.js', function (req, res) {
        res.sendfile ('client/ext/JSXTransformer-mod.js');
    })
    
    IO.router.get ('/node_modules/react/dist/react-with-addons.js', function (req, res) {
        res.sendfile ('node_modules/react/dist/react-with-addons.js');
    })
    
    IO.router.get ('/node_modules/socket.io/node_modules/socket.io-client/socket.io.js', function (req, res) {
        res.sendfile ('node_modules/socket.io/node_modules/socket.io-client/socket.io.js');
    })
    
    IO.router.get ('/node_modules/requirejs/require.js', function (req, res) {
        res.sendfile ('node_modules/requirejs/require.js');
    })
    
    IO.server.listen (process.env.PORT || 3000, process.env.IP || "0.0.0.0", function (){
      var addr = IO.server.address ();
      console.log ("Chat IO.server listening at", addr.address + ":" + addr.port);
    });
  }
  
  IO_with_browser.prototype.send = function io_with_browser_send () {
    console.log ("would send")
  }
  
  return {
    IO: IO_with_browser
  };
});