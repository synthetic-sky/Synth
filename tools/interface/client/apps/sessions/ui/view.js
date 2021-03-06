/** @jsx React.DOM */

define ("sessions/ui/view", ["underscore", "jquery", "react"], function (util, $, React)
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
  }
  
  View.prototype.render = function render_view (details)
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
      
      return <div> <b> {this.props.name} </b> </div>;
    }
  });
  
  return View;
});
