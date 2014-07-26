define ("plugins/sessions", ["fs", "model"], function (fs, model)
{
  function Session () {
    var session = this;
    session.id = ("" + rand ()).slice(2);
    session.model = new model.Model ();
    session.data = {};
  }
  
  function open_session (id) {
    var session = id ? load_session (id) : new Session ();
    return session;
  }
  
  return {
    events: {
    }
  };
});