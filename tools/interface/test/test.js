var expect = require ('chai') .expect;
var require = require ('requirejs');

function when (done) {
  return function (err) {
    if (err) {
      if (err instanceof Error)
        done (err);
      else
        done (new Error (JSON.stringify (err)));
    }
    else
      done ();
  };
}

function when_service (done, assertions) {
  return function (reply) {
    if (reply.status !== 0) {
      return when (done) (reply); // fail, report error
    }
    else { 
      if (assertions) 
        assertions (reply.data); // ok, continue with assertions
      done ();
    }
  };
}

describe ('server', function ()
{
  require.config ({
    baseUrl: './server'
  });
  
  describe ('plugins/loader', function () {
    var loader = require ('plugins/loader');
    
    it ('should return an events hash', function () {
      expect (loader) .to.have.property ('events');
    });
    
    it ('should respond to !load and !put events', function () {
      expect (loader.events) .to.respondTo ('!load');
      expect (loader.events) .to.respondTo ('!put');
    });
    
    it ('should expose .get and .put for testing', function () {
      expect (loader) .to.respondTo ('get');
      expect (loader) .to.respondTo ('put');
    });
    
    var key = 'test:test-key';
    var val = {
      uniq: Math.random ()
    };
    
    it ('should be possible to store a record under a name', function (done) {
      loader.put (key, val, when_service (done));
    });
        
    it ('should then be possible to retrieve the same record', function (done) {
      loader.get (key, when_service (done, function (record) {
        expect (record) .to.exist;
        expect (record) .to.have.property ('uniq') .that.equals (val.uniq);
      }));
    });
  });
});