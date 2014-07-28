define ("frame/logic/model.mutator", ["underscore"], function (util)
{
  function ModelMutator (app) {
    var model_mutator = this;
    
    model_mutator.local  = app;
    model_mutator.global = app.global;
    
    app.events (model_mutator, {
      'logic.text-input-change': model_mutator.fake_bogus_text_change_handler,
    });
  }
  
  ModelMutator.prototype.fake_bogus_text_change_handler = function fake_bogus_text_change_handler (the_new_text) {
    // this.global.history.register_change (...);
    console.log ("model_mutator: logic.text-input-change");
    this.global.io.emit ('new_text', the_new_text);
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
