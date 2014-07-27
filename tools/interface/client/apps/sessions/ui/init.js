define ("sessions/ui/init", ["sessions/ui/view.mutator", "jsx!sessions/ui/view", "sessions/ui/view.events"], 
  function (view_mutator, view, view_events)
{
  return {
    init: function ui_init (app) {
      app.view_mutator = new view_mutator.Mutator (app);
      app.view         = new view.View (app);
      app.view_events  = new view_events.Events (app);
    }
  };
});
