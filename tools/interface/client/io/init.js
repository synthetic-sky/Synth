define ("io/init", ["io/io.roundtrip", "io/io.backdoor", "io/loader"], function (io_roundtrip, io_backdoor, loader)
{
  return {
    init: function logic_init (app) {
      app.io = app.io_roundtrip = new io_roundtrip.IO (app);
      app.io_backdoor = new io_backdoor.IO (app);
      app.loader      = new loader.Loader (app);
      
      app.io.init ();
      app.io_backdoor.init ();
      app.loader.init ();
    }
  };
});