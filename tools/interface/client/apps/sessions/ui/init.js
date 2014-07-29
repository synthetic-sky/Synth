define ("sessions/ui/init", ["underscore", "sessions/ui/view.mutator", "jsx!sessions/ui/view", "sessions/ui/view.events"], 
  function (util, ViewMutator, View, ViewEvents)
{
  return {
    init: function ui_init (sessions) {
      new ViewMutator (sessions);
      new View (sessions);
      new ViewEvents (sessions);
    }
  };
});
