define ("sessions/init", ["common/app.base", "sessions/logic/init", "sessions/ui/init"],
  function (app_base, logic, ui)
{
  // inherit from app_base.AppBase
  Sessions.prototype = app_base.AppBase.prototype;
  
  function Sessions (app)
  {
    // initialise the local application app_base
    var sessions = this;
    
    // call base-class constructor
    app_base.AppBase.apply (sessions, arguments);

    // keep a link to the global application app_base
    sessions.global = app;
      
    // initialize the two sub-components
    logic.init (sessions);

    if (! config.headless)
      ui.init (sessions);

    console.log ("sessions.init done")
  }

  return {
    Sessions: Sessions
  };
});
