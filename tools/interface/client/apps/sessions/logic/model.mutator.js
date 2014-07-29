define ("sessions/logic/model.mutator", ["underscore"], function (util)
{
  function ModelMutator (sessions) {
    var model_mutator = this;
    
    model_mutator.local  = sessions;
    model_mutator.global = sessions.global;
    
    sessions.register ('model_mutator', model_mutator);
    
    sessions.events (model_mutator, {
      // ...
    });
  }
  
  return ModelMutator;
});