define ("history/logic/model", [], function ()
{
  function Model (app) {
    var model = this;
    model.local  = app;
    model.global = app.global;
  }
  
  return {
    Model: Model
  };
});
