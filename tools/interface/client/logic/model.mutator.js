define ("logic/model.mutator", ["common/space"], function (space)
{
  function ModelMutator (app) {
    var model_mutator = this;
    
    model_mutator.local = app;
    model_mutator.global = app.global;
    
    app.events (model_mutator, {
      session_init_confirm: model_mutator.on_session_init_confirm,
    });
  }
  
  ModelMutator.prototype.on_session_init_confirm = function model_mutator_session_init_confirm (details) {
    var model_mutator = this;
  };
  
  return {
    Mutator: ModelMutator
  };
});