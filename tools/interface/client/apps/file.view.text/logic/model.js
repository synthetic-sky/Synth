define ("file.view.text/logic/model", ["underscore"], function (util)
{
  function Model (file_view_text) {
    var model = this;
    
    model.local  = file_view_text;
    model.global = file_view_text.global;
    
    file_view_text.register ('model', model);
    
    file_view_text.events (model, {
      // ...
    });
  }
  
  return Model;
});