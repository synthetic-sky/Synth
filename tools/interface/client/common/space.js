define ("common/space", [], function ()
{
  function Space () {
    var space = this;
    // space.registry = Object.create (null);
    space.registry = space;
  }
  
  Space.prototype.register = function space_register (config) {
    var space = this;
    if (config.name in space.registry)
      return console.error ("cannot register " + config.name + "; the name is already taken");
    space.registry [config.name] = config;
  };
  
  Space.prototype.events = function space_events (obj, map) {
    var space = this;
    for (var event in map)
    {
      var handler = map [event];
      var handler_name = "on_" + event;
      if (handler_name in space.registry)
        return console.error ("cannot register " + handler_name + "; the name is already taken");
      space.registry [handler_name] = handler.bind (obj);
    }
  };
  
  Space.prototype.invoke = function space_invoke (type, headless) {
    var space = this;
    var uid = space.UID ();
    var app = space.registry [type] .create (uid, headless);
    app.uid = uid;
    space.registry [uid] = app;
    return uid;
  };
  
  Space.prototype.invoke_headless = function space_invoke_headless (type, message) {
    var space = this;
    return space.invoke (type, true);
  };
  
  Space.prototype.call = function space_call (instance, api, message) {
    var space = this;
    space.registry [instance] [api] (message);
  };
  
  Space.prototype.send = function space_send (instance, message) {
    var space = this;
    space.registry [instance] .got_mail (message);
  };
  
  Space.prototype.forget = function space_unregister (uid) {
    var space = this;
    delete space.registry [uid];
  };
  
  Space.prototype.UID = function space_uid () {
    return "uid:" + Math.random () + Math.random ()
  };
  
  return {
    Space: Space
  };
});