PROLAIM 
=======

Notes
-----
1. double definition of the shell controller -- not good!?
   * in module `prolaim.shell` in `shell.js`
   * in module `prolaim.layout` in `shell.controller.js`
2. module `prolaim.shell` is declared in `shell.module.js`
3. when starting the website 
   * shell.controller.js is called
   * shell.js is not called at all!!!
  
Components Deps Structure
-------------------------
* Prolaim
    * prolaim.core
        * blocks.logger
          * == logger factory
        * blocks.exception
          * blocks.logger
          * == exception factory
        * blocks.router
          * blocks.logger
          * ui.router
          * == routerHelper provider
    * prolaim.layout
    * prolaim.about
      * == About
    * prolaim.contact
    * prolaim.jobs
    * prolaim.main
      * prolaim.core
    * prolaim.partners
      * prolaim.core
    * prolaim.404
      * == P404

