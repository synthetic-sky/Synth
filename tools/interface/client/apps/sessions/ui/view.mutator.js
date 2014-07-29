define ("sessions/ui/view.mutator", ["underscore"], function (util)
{
  function ViewMutator (sessions) {
    var view_mutator = this;
    view_mutator.local  = sessions;
    view_mutator.global = sessions.global
    
    sessions.register ('view_mutator', view_mutator);
    
    sessions.events (mutator, {
      // sessions-specific mutations of the UI ..
    });
  }
  
  return ViewMutator;
});
