define ("frame/logic/manager", ["underscore"], function (util)
{
  function Manager (app) {
    var manager = this;
    manager.local  = app;
    manager.global = app.global;
  }
  
  Manager.prototype.init = function manager_init () {
    var manager = this;
    
    /*
     * The frame manages a bunch of views, belonging to different apps.
     *
     *   Not every app has a view open, but some apps have many views open.
     *  
    */
    
    manager.local.views = [];
    manager.local.open_view = manager.open_view.bind (manager);
    manager.local.close_view = manager.close_view.bind (manager);
    
    /*
     * On first load, i.e. right now, we want to display the loading screen,
     *   while we figure out whether we have a previous session on the server.
     *
     * If the server sends us the data of a previous in-progress session,
     *   we will faithfully restore the view of that session,
     *     the same as it looked the last time the user saw the workspace.
     *
     * While we do not use VMs for this, we want the behavior to be as smooth
     *    as that displayed by e.g. the Cloud9 workspaces.
    */
    
    manager.open_view ("frame")
    
  };
  
  Manager.prototype.open_view = function manager_open_view (app, app_data) {
    var manager = this;
    
    if (manager.local.views.length)
    {
      
    }
    
    var view_config = {
      app: app,
      app_data: app_data || {},
      ident: util.uniqueId ("view:")
    }
    
    manager.render_view (view_config);
    
    manager.local.views.push ()
  }
  
  Manager.prototype.close_view = function manager_close_view () {
    var manager = this;
    
    if (! manager.local.views.length)
      return console.error ("call to manager_close_view - but no view is open");
      
    var view_config = manager.local.views.pop ()
    
    // manager.local.emit ('frame/close-view');
    
    manager.local.on_frame_close_view ();
  }
  
  return Manager;
});
