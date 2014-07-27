frame/open-view
---------------
  A view is opened for an app, and shown to the user.
   If another view is currently open, this previous view is first closed.
   
  @.app = a local app space
  @.view_config contains app-specific data, that the app uses to maintain itself
  
  - reverse: frame/close-view

frame/close-view
----------------
  A view is closed. The view must previously have been opened.
    
  - reverse: frame/open-view