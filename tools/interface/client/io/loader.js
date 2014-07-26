define ("io/loader", [], function ()
{
  function Loader (app)
  {
    var loader = this;
    loader.local = app;
    loader.global = app.global;
    loader.outstanding = {};
    
    app.events (loader, {
      load_ok: loader.load_ok,
      load_fail: loader.load_fail
    });
  }
  
  Loader.prototype.init = function loader_init () {
    var loader = this;
    
    console.log ("init loader")
  }
  
  Loader.prototype.load = function load (details) {
    var loader = this;
    loader.local.io.emit ("!load", { paths: details.paths, path: details.path }, function (reply) {
      if (reply.success)
        details.callback && details.callback (reply.data);
      else
        loader.register_outstanding (reply.request_id, details.callback);
    });
  };
  
  Loader.prototype.register_outstanding = function (id, cb) {
    this.outstanding [id] = cb;
  };
  
  Loader.prototype.load_ok = function (reply) {
    if (reply.id in this.outstanding)
    {
      var cb = this.outstanding [reply.id];
      cb && cb (reply.data);
      delete this.outstanding [reply.id];
    }
  };
  
  Loader.prototype.load_fail = function (reply) {
    var cb = this.outstanding [reply.id];
    cb && cb (null, reply.error || "unknown error during load");
    delete this.outstanding [reply.id];
  };
  
  return {
    Loader: Loader 
  };
});