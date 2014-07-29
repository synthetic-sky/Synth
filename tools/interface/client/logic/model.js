define ("logic/model", ["common/model.base"], function (ModelBase)
{
  Model.prototype = ModelBase.prototype;
  
  function Model (app) {
    var model = this;
    model.local  = app;
    model.global = app.global;
  }
  
  return {
    Model: Model
  };
});