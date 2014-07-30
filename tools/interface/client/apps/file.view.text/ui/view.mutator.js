define ("file.view.text/ui/view.mutator", ["underscore"], function (util)
{
  function ViewMutator (file_view_text) {
    var view_mutator = this;
    view_mutator.local  = file_view_text;
    view_mutator.global = file_view_text.global
    
    file_view_text.register ('view_mutator', view_mutator);
    
    file_view_text.events (view_mutator, {
      'file_view_text.render': function (render_config) {
        this.local.view.render (render_config);
      },
    });
  }
  
  return ViewMutator;
});