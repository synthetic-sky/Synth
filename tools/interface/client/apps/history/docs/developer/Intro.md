A history is a sequence of actions. 

It reflects the current state of an application, or of a process involving multiple application.

Preferably, each action can be reversed by applying an opposite action.

For this purpose, every time an action is performed, enough information should be stored
in the history, to enable us to later invoke the opposite action, and return the application or process to its previous state.


In the latter case, one history can intersect with another history.

Most especially, the history of an application can intersect with the navigation history.

This can be thought of as one history nesting another history, 
 which it can skip over when undo-ing or redo-ing -
  i.e. when navigating forwards or backwards in the sequence of actions.


Question: How do histories work with promises ?
Answers:
  - the failure callback to a promise can choose to unwind a history to a (potentially distant) previous state
  - a sequence of promises corresponds to a sequence of actions, hence a history might be kept for it,
      allowing us to return to a previous point in the chain of promises
        -> this would require promises to be immutable, or us to make immutable copies of their state,
            so we can store the promises inside the history structure; ((or, if promises change over time, 
              we would need to be able to actively rewind such a changing-promise to some specific previous state)).
  