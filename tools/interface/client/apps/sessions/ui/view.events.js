define ("view.events", [], function ()
{
  function View.Events (app) {
    var view.events = this;
    view.events.local  = app;
    view.events.global = app.global;
  }
  
  return {
    View.Events: View.Events
  };
});
