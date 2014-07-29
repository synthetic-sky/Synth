define ("history/logic/manager", ["underscore"], function (util)
{
  function Manager (history) {
    var manager = this;
    
    manager.local  = history;
    manager.global = history.global;
    
    history.events (manager, {
      // ...
    });
  }
  
  Manager.prototype.init = function history_manager_init () {
    var manager = this;
  };
  
  Manager.prototype.register_change = function history_register_change () {
    var manager = this;
  };
  
  return Manager;
});
