define ("routes", ["express", "path"], function (express, path) {
  return {
    register: function (router) {
      
      router.use (express.static (path.resolve (".")));
      
      router.get ('/client/apps/main.js', function (req, res) {
          res.sendfile ('client/apps/main.jsx');
      })
    }
  }
})