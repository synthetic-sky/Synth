define ("sessions/init", ["underscore", "common/app.base", "sessions/logic/init", "sessions/ui/init"],
  function (util, AppBase, sessions_logic, sessions_ui)
{
  // inherit from AppBase
  Sessions.prototype = AppBase.prototype;

  function Sessions (app)
  {
    // initialise the local application app_base
    var sessions = this;
    
    // call base-class constructor
    AppBase.apply (sessions, arguments);

    // keep a link to the global application app_base
    sessions.global = app;
      
    // initialize the two sub-components
    sessions_logic.init (sessions);

    if (! config.headless)
      sessions_ui.init (sessions);

    console.log ("sessions.init done")
  }

  return Sessions;
});
