define ("frame/ui/init", ["frame/ui/view.mutator", "jsx!frame/ui/view", "frame/ui/view.events"], 
  function (ViewMutator, View, ViewEvents)
{
  // console.log ("in frame.ui.init, ViewMutator =", ViewMutator, ", View =", View, ", ViewEvents =", ViewEvents);
  return {
    init: function ui_init (app) {
      app.view_mutator = new ViewMutator (app);
      app.view         = new View (app);
      app.view_events  = new ViewEvents (app);
    }
  };
});
