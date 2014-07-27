define ("frame/logic/model.mutator", ["underscore"], function (util)
{
  function ModelMutator (app) {
    var model_mutator = this;
    model_mutator.local  = app;
    model_mutator.global = app.global;
  }
  
  ModelMutator.prototype.on_frame_close_view = function () {
    var model_mutator = this;
    var model = model_mutator.local.model;
    
    model.update ({
      ui: {
        state: {
          
        }
      }
    });
    
    var history = model_mutator.global.history;
    
    var old_view = util.last (model_mutator.local.views);
    
    history.register_change ({
      app: model_mutator.local,
      // new_state: model.get_current_revision (),
      action: {
        event: 'frame/close-view',
        details: null,
      },
      reverse: {
        event: 'frame/open-view',
        details: {
          view_config: old_view,
        },
      }
    })
  };
  
  return ModelMutator;
});
