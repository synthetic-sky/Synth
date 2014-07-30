define ("file.view.text/logic/model.mutator", ["underscore"], function (util)
{
  function ModelMutator (file_view_text) {
    var model_mutator = this;
    
    model_mutator.local  = file_view_text;
    model_mutator.global = file_view_text.global;
    
    file_view_text.register ('model_mutator', model_mutator);
    
    file_view_text.events (model_mutator, {
      // ...
    });
  }
  
  return ModelMutator;
});