define ("file.view.text/logic/init", ["underscore", "file.view.text/logic/manager", "file.view.text/logic/model.mutator", "file.view.text/logic/model"],
  function (util, Manager, ModelMutator, Model)
{
  return {
    init: function logic_init (file_view_text) {
      new Manager (file_view_text);
      new ModelMutator (file_view_text);
      new Model (file_view_text);
    
      file_view_text.manager.init ();
    }
  };
});
