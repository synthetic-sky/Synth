define ("ui/init", ["ui/view.mutator", "jsx!ui/view", "ui/view.events", "apps/frame/init"], function (view_mutator, view, view_events, frame)
{
  return {
    init: function ui_init (app) {
      
      // app here is the global application, i.e. Spiffy-UI
      app.view_mutator = new view_mutator.Mutator (app);
      app.view         = new view.View (app);
      app.view_events  = new view_events.Events (app);
      
      //! app.view.load ();
      
      // var frame = app.invoke ("frame");
      // console.assert (frame.uid);
      // frame. //! frame might not be loaded yet?
      
      app.invoke ("frame") .then (function (frame) {
        // render currently triggered in frame/logic/manager
        
        // frame.render (document.querySelector ("#frame"));
        // frame.trigger ('!render', { render_target: document.querySelector ("#frame") });
      }).catch (function (error) {
        throw error;
      })
      
      //! or, with requireJS handling the async
      
      // app.frame = frame.Frame ();
      // app.frame.init ();
      // app.frame.render (document.querySelector ("#frame"));
    }
  };
});
