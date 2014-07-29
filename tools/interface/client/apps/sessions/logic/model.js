define ("sessions/logic/model", ["underscore"], function (util)
{
  function Model (sessions) {
    var model = this;
    
    model.local  = sessions;
    model.global = sessions.global;
    
    sessions.register ('model', model);
    
    sessions.events (model, {
      // ...
    });
  }
  
  return Model;
});