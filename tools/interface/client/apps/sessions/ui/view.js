define ("view", [], function ()
{
  function View (app) {
    var view = this;
    view.local  = app;
    view.global = app.global;
  }
  
  return {
    View: View
  };
});
