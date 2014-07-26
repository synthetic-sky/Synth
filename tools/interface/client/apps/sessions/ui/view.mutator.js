define ("view.mutator", [], function ()
{
  function View.Mutator (app) {
    var view.mutator = this;
    view.mutator.local  = app;
    view.mutator.global = app.global;
  }
  
  return {
    View.Mutator: View.Mutator
  };
});
