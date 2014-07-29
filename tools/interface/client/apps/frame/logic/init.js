define ("frame/logic/init", ["frame/logic/manager", "frame/logic/model.mutator", "frame/logic/model"],
  function (Manager, Mutator, Model)
{
  // console.log ("in frame.logic.init, Manager =", Manager, ", Mutator =", Mutator, ", Model =", Model);
  return {
    init: function logic_init (frame) {
      new Manager (frame);
      new Mutator (frame);
      new Model (frame);
    
      spawn (frame.manager.init.bind (frame.manager)); // frame.manager.init is a generator
    }
  };
});
