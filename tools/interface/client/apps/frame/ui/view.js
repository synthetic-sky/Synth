/** @jsx React.DOM */

define ("frame/ui/view", ["jquery", "react"], function ($, React)
{
  function View (app) {
    var view = this;
    view.local  = app;
    view.global = app.global;
    
    view.local.events (view, {
      render: view.render.bind (view)
    });
  }
  
  View.prototype.render = function view_render (details)
  {
    var view = this;
    
    view.last_render = details;
      
    if (details.render_data)
    {
      console.assert (! ('frame' in details.render_data));
      details.render_data.frame = view.local;
    }
    
    if (! view.reactComponent)
      view.reactComponent = new view.reactComponentClass (details.render_data);
    
    if (details.render_target)
      React.renderComponent (view.reactComponent, details.render_target);
    else
      React.renderComponent (view.reactComponent, details);
  }
  
  
  // this code was lifted from a StackOverflow thread
  //   (i can't seem to find it right now)
  var ContentEditable = React.createClass({
    displayName: 'ContentEditable',

    render: function () {
      return React.DOM.div({
        onInput: this.emitChange,
        onBlur: this.emitChange,
        contentEditable: true,
        style: this.props.style,
        dangerouslySetInnerHTML: {
          __html: this.props.html
        }
      });
    },

    componentWillUpdate: function(nextProps) {
      if (nextProps.html !== this.getDOMNode().innerHTML) {
        this.getDOMNode().innerHTML = nextProps.html;
      }
    },

    shouldComponentUpdate: function (nextProps) {
      if (nextProps.html !== this.getDOMNode().innerHTML) {
        return true;
      }
      return false;
    },

    emitChange: function () {
      var html = this.getDOMNode().innerHTML;
      if (this.props.onChange && html !== this.lastHtml)
        this.props.onChange (html);
      this.lastHtml = html;
    }
  });
  
  View.prototype.reactComponentClass = React.createClass ({    
    displayName: 'frame.view',

    getInitialState: function () {
      return {
        html: this.props.data
      };
    },

    render: function render () {
      var component = this;
      
      // this.props contains the render_data passed to the class constructor
      
      var handleChange = function (text) {
        console.log ("changed to", text)
        component.html = event;
      } .bind (this);

      var text_style = { padding: "10px" };
      
      var frame = this.props.frame;
      
      return (
        <div id="frame">
          <div id="frame-top-menu-bar"></div>
          <div id="frame-view">
              <div id="frame-view-left-side" >
                <ContentEditable style={ text_style } 
                      onChange={ frame.emitter ("view.text-input-update") }
                          html={ this.props.data }/>
              </div>
              <div id="frame-view-ride-side">
              
              </div>
          </div>
          <div id="frame-bottom-menu-bar">
              <a href="#" className="button button-circle button-primary"id="do-open">Open</a>
              <a href="#" className="button button-circle" id="do-find">Query</a>
              <a href="#" className="button button-circle" id="do-up">Up</a>
              <a href="#" className="button button-circle" id="do-sideways">Related</a>
          </div>
        </div>
      )
      
      
      // <div id="#view-of-frame"> {this.props.name} </div>;
    },
    
    componentDidMount: function () {
      $("#frame-view") .height ($("#frame") .innerHeight () - 250);
      $(window).resize( function () {
      $("#frame-view") .height ($("#frame") .innerHeight () - 250); })
      $(".button") .click (function () {
          var $button = $(this);
          
          $("#frame-view-right-side") .append ("<p> Added by Button &lt;" + $button.attr ("id") + "&gt; </p>");
      });
    }
  });
  
  return View;
});
