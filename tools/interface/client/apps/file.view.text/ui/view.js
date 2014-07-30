/** @jsx React.DOM */

define ("file.view.text/ui/view", ["underscore", "jquery", "react", "ace"], function (util, $, React, ace)
{
  function View (file_view_text) {
    var view = this;
    view.local  = file_view_text;
    view.global = file_view_text.global;
    
    file_view_text.register ('view', view);
  }
  
  View.prototype.render = function file_view_text_render (details)
  {
    var view = this, file_view_text = this.local;
    
    view.view_config = details;
    
    if (! (details.render_target && details.render_data))
      throw new Error ("refusing to render view without a target and configuration");
      
    console.assert (details.render_data.file_view_text === undefined); // sanity
    details.render_data.file_view_text = file_view_text;
    details.render_data.view = view;
    
    // if (! view.reactComponent)
    //   view.reactComponent = new view.reactComponentClass (details.render_data);
    
    // React.renderComponent (view.reactComponent, details.render_target);
    
    $(details.render_target).append ('<div id="editor">');
    var editor = ace.edit("editor");
    editor.setTheme ("ace/theme/monokai");
    editor.getSession().setMode ("ace/mode/javascript");
    file_view_text.editor = editor;
  }
  
  View.prototype.reactComponentClass = React.createClass ({
    render: function render ()
    {
      var component = this,
             config = component.props,
               view = config.view, file_view_text = config.app;
      
      // this.props contains the render_data passed to the class constructor
      
      return <div> <b> Loading Editor... </b> </div>;
    },
    componentDidMount: function componentDidMount ()
    {
      var component = this,
             config = component.props,
               view = config.view, file_view_text = config.app;
      });
    },
  });
  
  return View;
});
