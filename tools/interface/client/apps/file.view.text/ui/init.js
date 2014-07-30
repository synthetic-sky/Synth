define ("file.view.text/ui/init", ["underscore", "file.view.text/ui/view.mutator", "jsx!file.view.text/ui/view", "file.view.text/ui/view.events"], 
  function (util, ViewMutator, View, ViewEvents)
{
  return {
    init: function ui_init (file_view_text) {
      new ViewMutator (file_view_text);
      new View (file_view_text);
      new ViewEvents (file_view_text);
    }
  };
});
