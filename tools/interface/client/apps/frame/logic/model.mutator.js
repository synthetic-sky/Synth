define ("logic/model.mutator", [], function ()
{
  function Model.Mutator (app) {
    var model.mutator = this;
    model.mutator.local  = app;
    model.mutator.global = app.global;
  }
  
  return {
    Model.Mutator: Model.Mutator
  };
});
