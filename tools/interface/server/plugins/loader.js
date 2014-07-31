/*
 * Loader: a storage service
 *
 *  AJAX API:
 *
 *     !put: store an object in the database
 *    !load: retrieve an object from the database
 *
*/

define ("plugins/loader", ["underscore"], function (util)
{
  /*
   * Tiny is a mixture of an in-memory store and a file-backed database.
   *
   *   It stores all field values smaller than 128 bytes in memory,
   *     and any larger blobs on disk.
   *
   *   So e.g. if we have a file document,
   *
   *     { file-name: '...', file-content: '...' },
   *
   *   it will store both the file-name and the file-content on disk,
   *     but also keep the file-name cached in memory.
  */
  var Tiny = require ("tiny");
  
  
  /*
   * Load or create the database files we will use as backing stores.
   *
  */
  var databaseTable = { };
  Tiny ("./storage/sessions.tiny", function (err, db) {
    if (err) throw err; else databaseTable ['session'] = db;
  });
  Tiny ("./storage/projects.tiny", function (err, db) {
    if (err) throw err; else databaseTable ['graph'] = db;
  });
  Tiny ("./storage/testing.tiny", function (err, db) {
    if (err) throw err; else databaseTable ['test'] = db;
  });
  
  /*
   * A simple service routine that takes a path of the form
   *
   *   database-identifier:document-identifier
   *
   *  and looks for a matching record in one of our tiny databases.
  */
  function service_loader (path, answer)
  {
    // parse the document path
    var m = /^(\w+):(.+)/.exec (path);
    
    if (! m)
      return answer ({ status: -1, error: "bad path syntax: <" + path + ">" });
    
    if (m [1] == 'graph')
      return answer ({ status: -1, error: "graph:* paths are not yet implemented" });
      
    // select the database using the database-identifier
    var db = select_database (m [1], answer);
      
    // retrieve the object from the database, and reply to the client when done
    db && db.get (m [2], function (error, record) {
      if (error)
        answer ({ status: -1,
          error: "database failed to return the requested session <" + m [2] + ">: " + error });
      else
        answer ({ status: 0, data: record });
    })
  }
    
  /*
   * A simple service routine that takes a path of the form
   *
   *   database-identifier:document-identifier
   *
   *  and stores the given JSON data in one of our tiny databases,
   *    so that it can later be retrieved by specifying the same path.
   *
  */
  function service_putter (path, data, answer)
  {
    // parse the document path
    var m = /^(\w+):(.+)/.exec (path);

    if (m)
    {
      if (m [1] == 'graph')
        return answer ({ status: -1, error: "graph:* paths are not yet implemented" });
        
      // select the database using the database-identifier
      var db = select_database (m [1], answer);
      
      // store the object in the database, and reply to the client when done
      db && db.set (m [2], data, function (error) {
        if (error)
          answer ({ status: -1,
            error: "database failed to create or update the requested session: " + error });
        else
          answer ({ status: 0 });
      });
    }
    else {
      answer ({ status: -1, error: "bad path syntax: <" + path + ">" });
    }
  }
  
  /*
   * A little helper to select the database handle, given the database-identifier.
   * 
   *   It will reply with a suitable error, if an unknown identifier is supplied.
  */
  function select_database (name, answer)
  {
    var db = databaseTable [name];
    
    if (! db)
      return answer ({ status: -1, 
        error: "bad protocol: expected one of [" 
          + util.keys (databaseTable) .join (', ') 
          + "] but got '" 
            + name
          + "'"
      });
    else
      return db;
  }

  return {
    events: {
      // !load is sent by the browser, to retrieve a persistent object, such as session data, or files
      "!load": function plugin_loader_on_load (request, reply_callback) {
        // var paths = request.paths || [];
        // if (request.path) paths.push (request.path);

        if (! reply_callback)
          return console.error ("!load received, but client didn't ask for a callback:", arguments);

        console.log ("received !load request for", request.path);

        service_loader (request.path, reply_callback);

        //! can't handle multiple paths at once yet; need to batch reply for callback
        // paths.forEach (function (path) {
        //   reply.objects.push (service_loader (path, reply_callback));
        // });
      },

      // !put is sent by the browser, to persist a (new) object, such as a session
      //    -- todo: will want to support incremental updates; possibly add !update for this
      "!put": function plugin_loader_on_put (request, reply_callback) {
        console.log ("received !put co for", request.path);

        if (! reply_callback)
          console.debug ("!put received, but client doesn't ask for a callback:", arguments);

         service_putter (request.path, request.data, reply_callback || function () {});
      }
    },
    put: service_putter,
    get: service_loader,
  };
})
