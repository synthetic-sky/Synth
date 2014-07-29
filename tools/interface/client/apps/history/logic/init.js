define ("history/logic/init", ["underscore", "history/logic/manager", "history/logic/model.mutator", "history/logic/model"],
  function (util, Manager, ModelMutator, Model)
{
  return {
    init: function logic_init (history) {
      new Manager (history);
      new Mutator (history);
      new Model (history);
    
      history.manager.init ();
    }
  };
  
  
  
});
