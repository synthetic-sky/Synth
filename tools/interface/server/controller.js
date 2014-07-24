define ("controller", ["model"], function (model)
{
  function Controller (session)
  {
    var ctl = this;
  
    ctl.session = session;
  }
  
  Controller.prototype.ctl_do_query = function ctl_do_query (params)
  {
    var ctl = this;
  }

  return {
    Controller: Controller
  };
});