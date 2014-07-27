define ("history/init", ["common/app.base", "history/logic/init", "history/ui/init"],
  function (app_base, logic, ui)
{
  // inherit from app_base.AppBase
  History.prototype = app_base.AppBase.prototype;

  function History (app, config)
  {
    // initialise the local application app_base
    var history = this;
    
    // call base-class constructor
    app_base.AppBase.apply (history, arguments);

    // keep a link to the global application app_base
    history.global = app;
      
    // initialize the two sub-components
    logic.init (history);

    // if (! config.headless)
    //   ui.init (history);
      
    app.register ("history", history);

    console.log ("history.init done")
  }
  
  History.prototype.register_change = function history_register_change (app, change) {
    console.assert (app.uid);
    
    
  }

  return {
    History: History
  };
});
