define ("plugins/loader", ["io-with-client"], function ()
{
  PouchDB = require ("pouchdb");
  var sessionDB = new PouchDB ("./storage/sessions");
  
  function service_loader (path, answer)
  {
    var m = /^(graph|session):(\w+)/.exec (path);
    
    if (m.length == 3)
    {
      if (m [1] == 'graph')
      {
        answer ({ status: -1, error: "graph:* paths are not yet implemented" })
      }
      else 
      if (m [1] == 'session')
      {
        sessionDB.get (m [2], function (error, record) {
          if (error)
          {
            answer ({
              status: -1,
              error: "database failed to return the requested session: " + error
            });
          }
          else
          {
            answer ({
              status: 0,
              data: record.session
            });
          }
        })
      }
      else
      {
        answer ({ status: -1, error: "bad protocol: expected either graph: or session:, but got <" + m [1] + ">" });
      }
    }
    else {
      answer ({ status: -1, error: "bad path syntax: <" + path + ">" })
    }
  }
  
  return {
    events: {
      "!load": function plugin_loader_on_load (details, reply_callback) {
        // var paths = details.paths || [];
        // if (details.path) paths.push (details.path);
        
        console.log ("received !load request");
        
        service_loader (details.path, reply_callback);
        
        //! can't handle multiple paths at once yet; need to batch reply for callback
        // paths.forEach (function (path) {
        //   reply.objects.push (service_loader (path, reply_callback));
        // });
      }
    }
  };
})
