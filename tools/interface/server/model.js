define ("model", ["storage"], function (storage)
{
  function Model ()
  {
      var model = this;
      model.data = {};
      model.storage = new storage.Storage ();
  }
  
  Model.prototype.save = function server_model_store () {
    var model = this;
    model.storage.store_model (model.data);
  };
  
  return {
    Model: Model
  };
});