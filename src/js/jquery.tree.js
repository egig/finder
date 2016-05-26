(function($, win, doc, undefined) {

  // The name of your plugin
  var pluginName = 'dttree';

  // Default options
  var defaults = {

  };

  // Public methods
  var methods = {

    // Gets called when creating a new instance
    // this.el is the element on which the plugin was called
    // this.opts contains the options passed to the plugin
    _init: function() {
        DTTREE.init(this.el, this.opts);
    },

    redraw: DTTREE.redraw
  };

  // Global properties and methods get attached to `$`
  // as opposed to `$.fn` so they can be extended from the outside
  global = {};

  // Add the plugin to the jQuery namespace and set-up the boilerplate base
  $.newPlugin(pluginName, defaults, methods, global);

}(jQuery, window, document));
