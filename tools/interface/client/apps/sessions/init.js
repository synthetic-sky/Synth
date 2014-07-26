define ("sessions", [
  "logic/init", "logic/model.mutator", "logic/manager", 
   "logic/model", "ui/init", "jsx!ui/view", "ui/view.events", "ui/view.mutator"], 
     function (
       logic, model_mutator, manager, 
        model, ui, view, view_events, view_mutator)
{
  function Sessions (config)
  {
    var app = { global: config.global };
    
    logic.init (app);

    if (! config.headless)
      app.events (ui, { "on_load": ui.init });
  }

  return {
    Sessions: Sessions
  };
});
