define ("history/logic/model_mutator", [], function ()
{
  function ModelMutator (app) {
    var model_mutator = this;
    model_mutator.local  = app;
    model_mutator.global = app.global;
  }
  
  return {
    ModelMutator: ModelMutator
  };
});
