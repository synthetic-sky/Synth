define ("ui/view.mutator", [], function () 
{
  function ViewMutator (app)
  {
    var mutator = this;
    
    mutator.local = app;
    mutator.global = app.global;
  }
  
  return {
    Mutator: ViewMutator
  }
});