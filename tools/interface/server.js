
var http = require('http');
var path = require('path');

var async = require('async');
var socketio = require('socket.io');
var express = require('express');

var fs = require ("fs");

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
    //
    // ## SimpleServer `SimpleServer(obj)`
    //
    // Creates a new instance of SimpleServer with the following options:
    //  * `port` - The HTTP port to listen on. If `process.env.PORT` is set, _it overrides this value_.
    //
    var router = express ();
    var server = http.createServer (router);
    var io     = socketio.listen (server);
    
    router.use (express.static (path.resolve (__dirname, 'client')));
    
    var messages = [];
    var sockets  = [];
    
    var controller = new Controller;
    
    var sessionBySocket = {};
    
    io.on('connection', function (socket) {
        sockets.push(socket);
    
        socket.on ('disconnect', function () {
          sockets.splice (sockets.indexOf(socket), 1);
          var session = sessionBySocket [socket.id]
          controller.s();
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
          var session = sessionBySocket [socket.id] = open_session ();
          console.log ("session was opened")
          socket.set('session.id', session.id, function (err) {
            console.log ("set session.id to " + name);
          });
        });
    });

    function updateRoster() {
      async.map(
        sockets,
        function (socket, callback) {
          socket.get('name', callback);
        },
        function (err, names) {
          broadcast('roster', names);
        }
      );
    }
    
    function broadcast(event, data) {
      sockets.forEach(function (socket) {
        socket.emit(event, data);
      });
    }
    
    server.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
      var addr = server.address();
      console.log("Chat server listening at", addr.address + ":" + addr.port);
    });
}


function Model ()
{
}

