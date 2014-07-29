define ("history/logic/model", ["underscore"], function (util)
{
  function Model (history) {
    var model = this;
    
    model.local  = history;
    model.global = history.global;
    
    history.register ('model', model);
    
    history.events (model, {
      // ...
    });
  }
  
  return Model;
});