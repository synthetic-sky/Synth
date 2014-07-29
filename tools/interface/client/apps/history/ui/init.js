define ("history/ui/init", ["underscore", "history/ui/view.mutator", "jsx!history/ui/view", "history/ui/view.events"], 
  function (util, ViewMutator, View, ViewEvents)
{
  return {
    init: function ui_init (history) {
      new ViewMutator (history);
      new View (history);
      new ViewEvents (history);
    }
  };
});
