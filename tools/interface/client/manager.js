define ("file.view.text/logic/manager", ["underscore"], function (util)
{
  function Manager (file.view.text) {
    var manager = this;
    
    manager.local  = file.view.text;
    manager.global = file.view.text.global;
    
    file.view.text.events (manager, {
      'file-load': manager.on_file_load.bind (manager),
    });
  }
  
  Manager.prototype.init = function file.view.text_manager_init () {
    var manager = this;
  };
  
  Manager.prototype.on_file_load = function file_view_text_file_load_handler (text)
  {
    // ..
  };
  
  return Manager;
});
