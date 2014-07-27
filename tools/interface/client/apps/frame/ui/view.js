/** @jsx React.DOM */

define ("frame/ui/view", ["jquery", "react"], function ($, React)
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
    
    if (! view.reactComponent)
      view.reactComponent = new view.reactComponentClass ({ data: "fake data" });
    
    if (details.render_target)
      React.renderComponent (view.reactComponent, details.render_target);
    else
      React.renderComponent (view.reactComponent, details);
  }
  
  View.prototype.reactComponentClass = React.createClass ({
    render: function render () {
      var component = this;
      
      // this.props contains the data passed to .renderComponent
      
      return (
        <div id="frame">
          <div id="frame-top-menu-bar"></div>
          <div id="frame-view">
              <div id="frame-view-left-side">
                { this.props.data }
              </div>
              <div id="frame-view-ride-side">
              
              </div>
          </div>
          <div id="frame-bottom-menu-bar">
              <a href="#" class="button button-circle button-primary"id="do-open">Open</a>
              <a href="#" class="button button-circle" id="do-find">Query</a>
              <a href="#" class="button button-circle" id="do-up">Up</a>
              <a href="#" class="button button-circle" id="do-sideways">Related</a>
          </div>
        </div>
      )
      
      
      // <div id="#view-of-frame"> {this.props.name} </div>;
    }
  });
  
  return View;
});
