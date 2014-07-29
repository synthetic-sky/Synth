define ("history/init", ["underscore", "common/app.base", "history/logic/init", "history/ui/init"],
  function (util, AppBase, history_logic, history_ui)
{
  // inherit from AppBase
  History.prototype = AppBase.prototype;

  function History (app)
  {
    // initialise the local application app_base
    var history = this;
    
    // call base-class constructor
    AppBase.apply (history, arguments);

    // keep a link to the global application app_base
    history.global = app;
      
    // initialize the two sub-components
    history_logic.init (history);

    if (! config.headless)
      history_ui.init (history);

    console.log ("history.init done")
  }

  return History;
});
