define ("sessions", 
  [ "common/space", "logic/init", "ui/init", "io/init", "io/loader"], 
    function (space,      logic,        ui,        io,      loader)
{
  function Sessions (config)
  {
    // initialise the global application space
    var app = new space.Space ();
      
    // initialise the two sub-components
    logic.init (app);

    if (! config.headless)
      ui.init (app);
  }

  return {
    Sessions: Sessions
  };
});
