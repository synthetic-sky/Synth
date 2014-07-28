define ("plugins/loader", ["io-with-client"], function ()
{
  var PouchDB = require ("pouchdb");
  var sessionDB = new PouchDB ("./storage/sessions");
  
  function service_loader (path, answer)
  {
    var m = /^(graph|session):(.+)/.exec (path);
    
    if (m)
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
            record.server_name = record._rev;
            answer ({
              status: 0,
              data: record
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
  
  function service_putter (path, data, answer)
  {
    var m = /^(graph|session):(\w+)/.exec (path);
    
    if (m)
    {
      if (m [1] == 'graph')
      {
        answer ({ status: -1, error: "graph:* paths are not yet implemented" })
      }
      else 
      if (m [1] == 'session')
      {
        if (data.server_name)
        {
          data._rev = data.server_name;
          delete data.server_name;
        }
        
        sessionDB.put (data, m [2], function (error, record) {
          if (error)
          {
            answer ({
              status: -1,
              error: "database failed to create or update the requested session: " + error
            });
          }
          else
          {
            answer ({
              status: 0,
              data: record
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
      answer ({ status: -1, error: "bad path syntax: <" + path + ">" });
    }
  }
  
  return {
    events: {
      "!load": function plugin_loader_on_load (details, reply_callback) {
        // var paths = details.paths || [];
        // if (details.path) paths.push (details.path);
        
        if (! reply_callback)
          return console.error ("!load received, but client didn't ask for a callback:", arguments);
        
        console.log ("received !load request");
        
        service_loader (details.path, reply_callback);
        
        //! can't handle multiple paths at once yet; need to batch reply for callback
        // paths.forEach (function (path) {
        //   reply.objects.push (service_loader (path, reply_callback));
        // });
      },
      
      "!put": function plugin_loader_on_put (details, reply_callback) {
        console.log ("received !put request");
        
        if (! reply_callback)
          console.debug ("!put received, but client doesn't ask for a callback:", arguments);
        
        service_putter (details.path, details.data, reply_callback || function () {});
      }
    }
  };
})
