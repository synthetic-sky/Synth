define (["jquery", "react"], function ($, React)
{
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
  $("#frame-view").height($("#frame").innerHeight()-250); })
  $(".button").click(function () {
      var $button = this;
      
      $("#frame-view-right-side").html("Test"); // [0].innerHTML += "<p>" + $button.attr("id").slice(3) + "</p>\n"
  })
});