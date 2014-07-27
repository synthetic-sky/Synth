define ("history/ui/init", ["history/ui/view.mutator", "jsx!history/ui/view", "history/ui/view.events"], 
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
