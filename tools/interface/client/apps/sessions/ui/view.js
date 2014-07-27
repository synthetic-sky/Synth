/** @jsx React.DOM */

define ("sessions/ui/view", ["jquery", "react"], function ($, React)
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
    
    view.last_render = details;
    
    if (details.render_target)
      React.renderComponent (details.render_target);
    else
      React.renderComponent (details);
  }
  
  View.prototype.reactComponent = React.createClass ({
    render: function render () {
      var component = this;
      
      // this.props contains the data passed to .renderComponent
      
      return <div> <b> {this.props.name} </b> </div>;
    }
  });
  
  return {
    View: View
  };
});
