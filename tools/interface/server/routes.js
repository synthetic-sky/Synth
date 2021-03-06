define ("routes", ["express", "path"], function (express, path) {
  return {
    register: function (router) {
      
      router.use (express.static (path.resolve ("dist")));
      router.use (express.static (path.resolve (".")));
      
      router.get ('/client/socket.io.js', function (req, res) {
          res.sendfile ('node_modules/socket.io/node_modules/socket.io-client/socket.io.js');
      })
    }
  }
})