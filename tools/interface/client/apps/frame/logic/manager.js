define ("frame/logic/manager", ["underscore"], function (util)
{
  function Manager (frame) {
    var manager = this;
    manager.local  = frame;
    manager.global = frame.global;
    
    
    frame.register ('manager', manager);
    
    /*
     *
     *
    */
    
    frame.register ('views', {});
    
    frame.events (manager, {
      'frame.logic.text-input-change': manager.fake_bogus_text_change_handler,
      'frame.logic.open-file-view': function () {
        manager.open_view ({
          name: 'file.view.text',
          unique: true,
        });
      }
    });
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
     * The frame always renders, and there is only exactly one frame.
     *
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
    
    manager.global.Pouch.remove ('test-key', function (err)
    {
      if (err)
         console.debug ("test-key was not in the local database: ok?")
       
      manager.global.io.emit ('!load', { path: 'session:test-key' }, function (reply) {
        // stub
        console.log ("received reply for !load", reply)
        
        if (reply.status !== 0)
        {
          console.log ("session data not found on server - initiating new session", reply);
          reply = { data: { text: '(new session)', _key: 'test-key' } };
        }
        var id = reply.data._key;
        delete reply.data._id;
        delete reply.data._key;
        manager.global.Pouch.get (id, function (err, doc) {
          manager.global.Pouch.remove (doc, function (err) {
            if (err) console.log (id, "not previously found in local Pouch, ok?", err, reply.data)
            manager.global.Pouch.put (reply.data, id, function (err, ok) {
              if (err){
                console.error ("failed to put doc into local database:", err, reply.data)
              }
              else
              {
                manager.global.Pouch.get ('test-key') .then (function (doc)
                {
                  if (! manager.fake_bogus_text_obj)
                    manager.fake_bogus_text_obj = doc;
                  console.log ("manager.init: loaded doc:", doc)
                  manager.local.queue ('render', {
                    render_target: document.body,
                    render_data: { data: doc.text },
                  });
                }, function (err) {
                  console.error ("manager.init: failed to load doc:", err)
                }).catch (function (err) {
                  console.error ("manager.init: failed during render:", err)
                })
              }
            });
          });
        });
      });
    });
  };
  
  Manager.prototype.fake_bogus_text_change_handler = function fake_bogus_text_change_handler (the_new_text) {
    console.log ("manager: frame.logic.text-input-change");
    var manager = this;
    
    // block (= throttle) text-input-change, because it can come in too quickly (for PouchDB to keep up);
    //   -> this essentially makes the following asynchronous code a kind of atomic block, from *this* specific event's point of view
    //  ! when we move/copy part of this code into the sessions app, we can block there(waiting for Pouch),
    //        and still continue to block here, to avoid spamming session.update events.
    //    ! but note that when we unblock the sessions.update queue, we will want to process the entire backlog of events. etc.
    //         (so multiple event throttles can serve different purposes)
    var done = manager.local.block ('frame.logic.text-input-change');
    
    manager.global.Pouch.get ('test-key', function (err, doc)
    {
      if (err)
        console.error ("fake_bogus_text_change_handler: document was not previously in local Pouch")
      
      manager.fake_bogus_text_obj = doc;
      manager.fake_bogus_text_obj.text = the_new_text;
      
      manager.global.Pouch.put (manager.fake_bogus_text_obj, function (err, ok) {
        if (! err)
        {
          console.log ("fake_bogus_text_change_handler: stored doc in local PouchDB", ok, manager.fake_bogus_text_obj)
          manager.fake_bogus_text_obj._rev = ok.rev;
          done (true);
          manager.fake_bogus_text_obj.server_name = manager.fake_bogus_text_obj_server_name;
          manager.global.io.emit ('!put', { path: 'session:test-key', data: manager.fake_bogus_text_obj }, function (reply) {
            if (reply.status != 0)
              console.error ("failed to replicate session onto server", reply);
            else
            {
              console.log ("received reply for !put: session updated ok", reply);
            }
          });
        }
        else
          console.error ("fake_bogus_text_change_handler: failed to put into local PouchDB", err, ok, manager.fake_bogus_text_obj);
      });
    });
  }
  
  Manager.prototype.open_view = function frame_manager_open_view (details, app_data) {
    var manager = this, frame = this.local;
    console.assert (details.name);
    
    if (! frame.views [details.name] || ! details.unique)
    {
      var name = details.name;
      frame.invoke (details.name) .then (function (app) {
        frame.views [details.name] = app;
        manager.render_view (app, app_data);
      })
    }
    else
    {
      manager.render_view (frame.views [details.name], app_data);
    }
  };
      
  Manager.prototype.render_view = function frame_manager_render_view (app, app_data)
  {
    var manager = this, frame = this.local;
    
    console.log ("frame.mananger.render_view", app, app_data);
    
    console.assert (frame.viewport, "frame.ui.view should have registered the viewport by now");
    
    app.trigger ('frame.render', {
      render_target: frame.viewport,
      render_data: app_data || {},
    });
    
    frame.emit ('frame.model.switch-view',  { view_config: view_config });
    
    var view_config = {
      app: app,
      app_data: app_data || {},
      ident: util.uniqueId ("view:")
    };
    
    frame.active_view = view_config;
    
    // manager.render_view (view_config);
  };
  
  Manager.prototype.close_view = function manager_close_view () {
    var manager = this;
    
    if (! manager.local.views.length)
      return console.error ("call to manager_close_view - but no view is open");
      
    var view_config = manager.local.views.pop ()
    
    // manager.local.emit ('frame/close-view');
    
    manager.local.on_frame_close_view ();
  };
  
  return Manager;
});
