define ("frame/logic/model", ["common/model.base"], function (ModelBase)
{
  Model.prototype = ModelBase.prototype;
  
  function Model (frame) {
    var model = this;
    model.local  = frame;
    model.global = frame.global;
    frame.register ('model', model);
  }
  
  Model.prototype.update = function frame_model_update ()
  {
    var model = this;
    
    model
  }
  
  return Model;
});