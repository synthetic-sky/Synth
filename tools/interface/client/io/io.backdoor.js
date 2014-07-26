define ("io/io.backdoor", ["socket_io"], function (socket_io) 
{
  function IO (app) 
  {
    var io = this;
    io.local = app;
    io.global = app.global;
    
    io.socket = io.local.io_roundtrip.get_socket ();
  }

  IO.prototype.init = function IO_init ()
  {
    var socket = socket_io ('https://' + location.host);
    socket.on ('synth_init', function (data) {
      console.log (data);
      socket.emit ('synth_client_init', { version: "0.0.0", status: "ok" });
    });
  }

  return {
    IO: IO
  }
});
