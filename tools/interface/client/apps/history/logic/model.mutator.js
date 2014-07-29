define ("history/logic/model.mutator", ["underscore"], function (util)
{
  function ModelMutator (history) {
    var model_mutator = this;
    
    model_mutator.local  = history;
    model_mutator.global = history.global;
    
    history.register ('model_mutator', model_mutator);
    
    history.events (model_mutator, {
      // ...
    });
  }
  
  return ModelMutator;
});