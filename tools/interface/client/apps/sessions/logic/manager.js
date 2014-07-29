define ("sessions/logic/manager", [], function ()
{
  function Manager (app) {
    var manager = this;
    manager.local  = app;
    manager.global = app.global;
  }
  
  Manager.prototype.init = function sessions_manager_init () {
    var manager = this;
  };
  
  return {
    Manager: Manager
  };
});