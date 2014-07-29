define ("history/ui/view.events", ["underscore"], function (util)
{
  function ViewEvents (history) {
    var view_events = this;
    
    view_events.local  = history;
    view_events.global = history.global;
    
    history.register ('view_events', view_events);
    
    history.events (view_events, {
      // ...
    });
  }
  
  return ViewEvents;
});