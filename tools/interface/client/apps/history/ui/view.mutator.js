define ("history/ui/view.mutator", [], function ()
{
  function ViewMutator (app) {
    var mutator = this;
    mutator.local  = app;
    mutator.global = app.global
    
    app.events (mutator, {
      // app-specific mutations ..
    });
  }
  
  return {
    Mutator: ViewMutator
  };
});
