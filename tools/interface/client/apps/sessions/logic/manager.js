define ("manager", [], function ()
{
  function Manager (app) {
    var manager = this;
    manager.local  = app;
    manager.global = app.global;
  }
  
  return {
    Manager: Manager
  };
});
