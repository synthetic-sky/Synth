define ("file.view.text/init", ["underscore", "common/app.base", "file.view.text/logic/init", "file.view.text/ui/init"],
  function (util, app_base, file_view_text_logic, file_view_text_ui)
{
  // inherit from app_base.AppBase
  FileViewText.prototype = app_base.AppBase.prototype;

  function FileViewText (app, headless)
  {
    // initialise the local application app_base
    var file_view_text = this;
    
    // call base-class constructor
    app_base.AppBase.apply (file_view_text, arguments);

    // keep a link to the global application app_base
    file_view_text.global = app;
      
    // initialize the two sub-components
    file_view_text_logic.init (file_view_text);

    if (! headless)
      file_view_text_ui.init (file_view_text);

    console.log ("FileViewText.init done")
  }

  return FileViewText;
});
