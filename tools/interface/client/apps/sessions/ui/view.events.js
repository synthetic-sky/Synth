define ("sessions/ui/view.events", ["underscore"], function (util)
{
  function ViewEvents (sessions) {
    var view_events = this;
    
    view_events.local  = sessions;
    view_events.global = sessions.global;
    
    sessions.register ('view_events', view_events);
    
    sessions.events (view_events, {
      // ...
    });
  }
  
  return ViewEvents;
});