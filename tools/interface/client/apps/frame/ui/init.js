define ("ui/init", ["ui/view.mutator", "jsx!ui/view", "ui/view.events"], 
        function       (view_mutator,      view,      view_events)
{
  return {
    init: function ui_init (app) {
      app.view_mutator = new view_mutator.Mutator (app);
      app.view         = new view.View (app);
      app.view_events  = new view_events.Events (app);
    }
  };
});
