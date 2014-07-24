define ("storage", ["pouchdb"], function (model)
{
  function Model ()  {
      var model = this;
  }
  
  Model.prototype.store_model = function server_model_storage_store_model (model) {
    // pouchdb...
    json_store_model (model);
  }
  Model.prototype.load_model = function server_model_storage_load_model (id) {
    // pouchdb...
    return json_load_model (id);
  }

  
  // stubs

  var STORAGE_FOLDER = "tools/interface/server/storage";
  
  function json_store_model (model) {
    var json = JSON.stringify (model);
    fs.writeFileSync (STORAGE_FOLDER + "/" + model.id + ".json", json);
  }
  
  function json_load_model (id) {
    var json = fs.readFileSync (STORAGE_FOLDER + "/" + model.id + ".json");
    return eval (json);
  }
  
  return {
    Model: Model
  };
});