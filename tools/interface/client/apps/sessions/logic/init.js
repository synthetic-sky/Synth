define ("sessions/logic/init", ["underscore", "sessions/logic/manager", "sessions/logic/model.mutator", "sessions/logic/model"],
  function (util, Manager, ModelMutator, Model)
{
  return {
    init: function logic_init (sessions) {
      new Manager (sessions);
      new Mutator (sessions);
      new Model (sessions);
    
      sessions.manager.init ();
    }
  };
});
