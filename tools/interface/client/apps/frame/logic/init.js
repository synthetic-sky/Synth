define ("frame/logic/init", ["frame/logic/manager", "frame/logic/model.mutator", "frame/logic/model"],
  function (Manager, Mutator, Model)
{
  // console.log ("in frame.logic.init, Manager =", Manager, ", Mutator =", Mutator, ", Model =", Model);
  return {
    init: function logic_init (app) {
      new Manager (app);
      new Mutator (app);
      new Model (app);
    
      app.manager.init ();
    }
  };
});
