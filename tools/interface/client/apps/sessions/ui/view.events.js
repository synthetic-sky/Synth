define ("sessions/ui/view_events", [], function ()
{
  function ViewEvents (app) {
    var view_events = this;
    view_events.local  = app;
    view_events.global = app.global;
  }
  
  return {
    ViewEvents: ViewEvents
  };
});
