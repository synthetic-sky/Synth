define ("file.view.text/ui/view.events", ["underscore"], function (util)
{
  function ViewEvents (file_view_text) {
    var view_events = this;
    
    view_events.local  = file_view_text;
    view_events.global = file_view_text.global;
    
    file_view_text.register ('view_events', view_events);
    
    file_view_text.events (view_events, {
      // ...
    });
  }
  
  return ViewEvents;
});