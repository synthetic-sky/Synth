/** @jsx React.DOM */

define ("ui/view", ["jquery", "react"], function ($, React) 
{
  function View (app)
  {
    var view = this;
    
    view.local = app;
    view.global = app.global;
  }
  
  View.prototype.load = function () {
    var HelloWorld = React.createClass({
      render: function() {
        return (
          <p>
            Hello, <input type="text" placeholder="Synth" />!
              It is {this.props.date.toTimeString()}
           </p>
         );
       }
    });
  
    setInterval(function() {
        React.renderComponent(
            <HelloWorld date={new Date()} />,
                $('#frame-view-left-side')[0]
        );
    }, 500);
  
    $("#frame-view").height($("#frame").innerHeight()-250);
    $(window).resize( function () {
      $("#frame-view").height($("#frame").innerHeight()-250); });
      $(".button").click(function () {
          var $button = $(this);
          $("#frame-view-right-side").text($button.attr("id").slice(3));
    })
  };
  
  return {
    View: View
  }
});