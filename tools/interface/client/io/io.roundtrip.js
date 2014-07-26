define ("io/io.roundtrip", ["socket_io"], function (socket_io)
{
  function IO (app) {
    var io = this;
    io.local = app;
    io.global = app.global;
  }

  IO.prototype.init = function IO_init ()
  {
    var io = this;
    
    var socket = socket_io ('https://' + location.host);
    
    io.socket = socket;
    
    socket.on ('synth_init', function (data) {
      console.log (data);
      socket.emit ('synth_client_init', { version: "0.0.0", status: "ok" });
    });
  }
  
  IO.prototype.get_socket = function () { return this.socket };
  
  IO.prototype.emit = function (event, data, callback) {
    var io = this;
    io.socket.emit (event, data, callback); 
  };

  return {
    IO: IO
  }
});
