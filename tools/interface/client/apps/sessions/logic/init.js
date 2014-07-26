define ("init", [], function ()
{
  return {
    init: function logic_init (app) {
      app.manager       = new manager.Manager (app);
      app.model_mutator = new model_mutator.Mutator (app);
      app.model         = new model.Model (app);
    
      app.manager.init ();
    }
  };
});
