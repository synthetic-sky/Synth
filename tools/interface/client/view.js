/** @jsx React.DOM */

define ("file.view.text/ui/view", ["underscore", "jquery", "react", "code-mirror"], function (util, $, React, CodeMirror)
{
  function View (app) {
    var view = this;
    view.local  = app;
    view.global = app.global;
    
    view.local.events (view, {
      render: function (details) {
        view.local.view.render (details.target);
      }
    });
    
    view.f
  }
  
  View.prototype.render = function file_view_ext_render (details)
  {
    var view = this;
    
    if (! view.reactComponent)
      view.reactComponent = new view.reactComponentClass (details.render_data);
    
    if (details.render_target)
      React.renderComponent (view.reactComponent, details.render_target);
    else
      React.renderComponent (view.reactComponent, details);
  }
  
  View.prototype.reactComponentClass = React.createClass ({
    render: function render () {
      var component = this;
      
      // this.props contains the render_data passed to the class constructor
      
      return <div id="codemirror"> <b> This is a file view </b> </div>;
    }
  });
  
  return View;
});
