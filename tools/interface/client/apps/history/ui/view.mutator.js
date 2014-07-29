define ("history/ui/view.mutator", ["underscore"], function (util)
{
  function ViewMutator (history) {
    var view_mutator = this;
    view_mutator.local  = history;
    view_mutator.global = history.global
    
    history.register ('view_mutator', view_mutator);
    
    history.events (mutator, {
      // history-specific mutations of the UI ..
    });
  }
  
  return ViewMutator;
});
