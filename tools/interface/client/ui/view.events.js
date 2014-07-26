define ("ui/view.events", [], function () 
{
  function ViewEvents (app)
  {
    var events = this;
    
    events.local = app;
    events.global = app.global;
    
    events.local.events (events, {
      
    });
  }
  
  return {
    Events: ViewEvents
  }
});