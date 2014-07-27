define ("frame/init", ["common/app.base", "frame/logic/init", "frame/ui/init"],
  function (app_base, logic, ui)
{
  // inherit from app_base.AppBase
  Frame.prototype = app_base.AppBase.prototype;

  function Frame (app)
  {
    // initialise the local application app_base
    var frame = this;
    
    // call base-class constructor
    app_base.AppBase.apply (frame, arguments);
    
    // register ourselves in the global application space
    app.register ("frame", frame); // we are a singleton instance

    // keep a link to the global application space
    frame.global = app;
      
    // initialize the two sub-components
    logic.init (frame);
    ui.init    (frame); // frame can never be headless

    console.log ("frame.init done")
  }

  return Frame;
});
