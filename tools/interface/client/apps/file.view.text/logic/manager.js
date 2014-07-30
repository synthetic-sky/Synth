define ("file.view.text/logic/manager", ["underscore"], function (util)
{
  function Manager (file_view_text) {
    var manager = this;
    
    manager.local  = file_view_text;
    manager.global = file_view_text.global;
    
    file_view_text.register ('manager', manager);
    
    file_view_text.events (manager, {
      'frame.render': function (render_config) {
        manager.local.emit ('file_view_text.render', render_config);
      },
    });
  }
  
  Manager.prototype.init = function file_view_text_manager_init () {
    var manager = this, file_view_text = this.local;
  };
  
  return Manager;
});
