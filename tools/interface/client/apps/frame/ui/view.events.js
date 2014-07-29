define ("frame/ui/view.events", ["underscore", ""], function (util)
{
  function ViewEvents (app) {
    var view_events = this;
    view_events.local  = app;
    view_events.global = app.global;
    
    app.events (app, {
      'view.text-input-update': function (new_text_of_the_control) {
        console.log ("text was changed to:", new_text_of_the_control);
        app.emit ('logic.text-input-change', new_text_of_the_control);
      },
    });
  }
  
  return ViewEvents;
});