define ("history/logic/manager", [], function ()
{
  function Manager (app) {
    var manager = this;
    manager.local  = app;
    manager.global = app.global;
  }
  
  Manager.prototype.init = function manager_init () {
    var manager = this;
  };
  
  return {
    Manager: Manager
  };
});
