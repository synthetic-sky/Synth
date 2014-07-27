define ("frame/logic/init", ["frame/logic/manager", "frame/logic/model.mutator", "frame/logic/model"],
  function (Manager, Mutator, Model)
{
  console.log ("in frame.logic.init, Manager =", Manager, ", Mutator =", Mutator, ", Model =", Model)
  return {
    init: function logic_init (app) {
      app.manager       = new Manager (app);
      app.model_mutator = new Mutator (app);
      app.model         = new Model (app);
    
      // !unstub
      // app.manager.init ();
    }
  };
});
