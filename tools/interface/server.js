
var http = require('http');
var path = require('path');

var async = require('async');
var socketio = require('socket.io');
var express = require('express');

var fs = require ("fs");

var nano = require ("nanomsg");

var STORAGE_FOLDER = "tools/interface/server/storage";

function Session ()
{
  var session = this;

  session.id = ("" + rand ()).slice(2);
  session.data = {};
}

function open_session (id)
{
  var session = id ? load_session (id) : new Session ();
  
  return session;
}

function save_session ()
{
  var json = JSON.stringify (session);
  fs.writeFileSync (STORAGE_FOLDER + "/" + session.id + ".json", json);
}

function load_session (id)
{
  var json = fs.readFileSync (STORAGE_FOLDER + "/" + session.id + ".json");
  return eval (json);
}


function Controller (session)
{
  var ctl = this;

  ctl.session = session;
}

Controller.prototype.ctl_do_query = function ctl_do_query (params)
{
  var ctl = this;
}


function Reactor ()
{
}


function IO_facing_synth ()
{
}


function IO_facing_client ()
{
    var IO = this;
    IO.router = express ();
    IO.server = http.createServer (IO.router);
    IO.io     = socketio.listen (IO.server);
    
    IO.router.use (express.static (path.resolve (__dirname, 'client')));
    
    IO.sockets  = [];
    
    IO.controller = new Controller;
    
    IO.sessionBySocket = {};
    
    IO.io.on('connection', function (socket) {
        sockets.push(socket);
    
        socket.on ('disconnect', function () {
          sockets.splice (IO.sockets.indexOf(socket), 1);
          var session = IO.sessionBySocket [socket.id]
	  suspend_session_soon (session);
        });
    
        socket.on('message', function (msg) {
          var text = String(msg || '');
    
          if (!text)
            return;
    
          socket.get('name', function (err, name) {
            var data = {
              name: name,
              text: text
            };
    
            broadcast('message', data);
            messages.push(data);
          });
        });
    
        socket.on('synth_client_init', function (name) {
          console.log ("synth_client_init received")
          var session = IO.sessionBySocket [socket.id] = open_session ();
          console.log ("session was opened")
          socket.set('session.id', session.id, function (err) {
            console.log ("set session.id to " + name);
          });
        });
    });

    function broadcast(event, data) {
      sockets.forEach(function (socket) {
        socket.emit(event, data);
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
    
    IO.router.get ('/client/jquery.js', function (req, res) {
        res.sendfile ('client/jquery.js');
    })
    
    IO.router.get ('/node_modules/react/dist/JSXTransformer.js', function (req, res) {
        res.sendfile ('node_modules/react/dist/JSXTransformer.js');
    })
    
    IO.router.get ('/node_modules/react/dist/react-with-addons.js', function (req, res) {
        res.sendfile ('node_modules/react/dist/react-with-addons.js');
    })
    
    IO.router.get ('/node_modules/socket.io/node_modules/socket.io-client/socket.io.js', function (req, res) {
        res.sendfile ('node_modules/socket.io/node_modules/socket.io-client/socket.io.js');
    })
    
    
    IO.server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
      var addr = IO.server.address();
      console.log("Chat IO.server listening at", addr.address + ":" + addr.port);
    });
}


function Model ()
{
    var model = this;
}

IO_right = new IO_facing_client ();

var pub = nano.socket('pub');
var sub = nano.socket('sub');

var addr = 'tcp://' + process.env.IP + ':' + 20123
pub.bind(addr);
sub.connect(addr);

sub.on('message', function (buf) {
    console.log(buf.toString());
    pub.close();
    sub.close();
});

setTimeout(function () {
    pub.send("Hello from nanomsg!");
}, 100);
