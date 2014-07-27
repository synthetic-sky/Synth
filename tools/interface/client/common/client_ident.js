define ("common/client_ident", ["underscore", "common/client_ident"], function (util, client_ident)
{
  function ClientIdentManager (app) {
    var cim = this;
    
    cim.local = null;
    cim.global  = app;
    
    cim.initial_ident = "client_(unconnected)_" + (Math.random () + "") .slice (2) + (Math .random () + "") .slice (2)
    cim.client_ident  = null;
  }
  
  ClientIdentManager.prototype = {
    
    get_client_id: function () {
      if (! this.client_ident)
        this.load_ident ();
        
      return this.client_ident || this.initial_ident;
    },
    
    /*
     * This routine allows the server to pick a globally unique client ident for us.
     *  Not sure if we need this. Also, simply using .random () could work. But OK.
     *
    */
    load_ident: function () {
      var cim = this;
      
      if (cim.load_in_progress)
        return;
      cim.load_in_progress = true;
      
      // nys if .global.load takes a single callback, or two (success, failure) callbacks.
      this.global.load ('session:client_ident', function (error, reply) {
        if (! error)
          cim.client_ident = reply.client_ident;
        else
          setTimeout (cim.load_ident, 60 * 1000);
      })
    },
  };
  
  return {
    ClientIdentManager: ClientIdentManager
  };
});