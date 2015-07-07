(function($, win, doc, undefined) {

  var NODES_ELEMENT = 'UL';
  var NODE_ELEMENT = 'LI';
  var NODE_TOGGLER_CLASS = 'dttree-node-toggler';
  var pluginName, defaults, methods, global;

  // The name of your plugin
  pluginName = 'dttree';

  // Default options
  defaults = {
    nodes: [],
    classes: {
          collapsedToggler: 'fa fa-folder-o',
          expandedToggler: 'fa fa-folder-open-o'
      },
  };

  // Public methods
  methods = {

    // Gets called when creating a new instance
    // this.el is the element on which the plugin was called
    // this.opts contains the options passed to the plugin
    _init: function() {
      this.$el = $(this.el);
        var root = this._renderNodes(this.opts.nodes);
        $(this.el).append(root);

      this._listen();
    },

    // listen tree activities
    // this mostly expand and collapse event
    // some click on node toggler
   _listen: function() {
          // listening...
          var _this = this;
          $(this.el).on('click', 'a.'+NODE_TOGGLER_CLASS, function(e){
              e.preventDefault();

              var toggler = $(this);

              var a = toggler.siblings('.dttree-node');

              var path = a.attr('href');

              if(toggler.children('i').hasClass(_this.opts.classes.expandedToggler)) {
                  _this.collapse(path);
              } else {
                  _this.expand(path);
              }
          });
      },

    // data prototype:
    // var nodes = [{path: '/', label: '/', type: 'dir'}]
    // path and label is mandatory
    _renderNodes: function (nodes){

          if(nodes.length > 0) {
              var ul =  this._create(NODES_ELEMENT);

              for(i=0; i<nodes.length; i++) {

                  // @todo decouple filter dir
                  if(nodes[i].type === 'dir') {
                      var li = this._renderNode(nodes[i]);
                      $(ul).append(li);
                  }
              }
              return ul;
          }

          return null;
      },

      // render single node to node element
      // if node contains nodes, then it will
      // recursively rendered as well
      _renderNode: function(node) {

          var path = node.path;
          var label = node.label;


          path = path === '/' ? '' : path;

          var a = this._create('A', {href: '#/'+path})
              .addClass('dttree-node')
              .append(' '+label);

          var toggler = this._createNodeToggler(node);
          var li = this._create(NODE_ELEMENT)
              .append(toggler)
              .append(a);

          if(typeof node.nodes == 'array') {
              var ul = this._renderNodes(node.nodes);
              li.append(ul);
          }

          return li;
      },

      // Creat node toggler and attach the node to it
      _createNodeToggler: function(node) {

          var togglerIcon = this._create('I').addClass(this.opts.classes.collapsedToggler);
          var toggler = this._create('A', {href: '#'})
              .addClass(NODE_TOGGLER_CLASS)
              .append(togglerIcon)
              .data('node', node);
          return toggler;
      },

      // Create element
      _create: function(name, attr) {
          var el = document.createElement(name);

          if(typeof attr != 'undefined') {
              $.each( attr, function( key, value ) {
                  $(el).attr(key, value);
              });
          }

          return $(el);
      },

      setChildren: function(childs, path) {

        if(typeof(path) == 'undefined') {
          var parent = this.element;
        } else {
          var a = $('a[href="#'+path+'"].dttree-node', this.el);
          var parent = a.parent('li');
        }

        parent.children('ul').remove();
        var html = this._renderNodes(childs);
        $(html).hide();
        parent.append(html);
      },

      collapse: function(path) {
          path = this._sanitizePath(path);
          var a = $('a[href="'+path+'"]', this.el);
          var i = $(a).siblings('.dttree-node-toggler').children('i');

          i.removeClass(this.opts.classes.expandedToggler);
          i.addClass(this.opts.classes.collapsedToggler);

          $(a).siblings('ul').slideUp('fast');
      },

      expand: function(path) {
        path = this._sanitizePath(path);
        var a = $('a[href="'+path+'"]', this.el);

        if($.isFunction(this.opts.onBeforeExpand)) {
          this.opts.onBeforeExpand(path, this);
        }

        var i = $(a).siblings('.dttree-node-toggler').children('i');

        i.removeClass(this.opts.classes.collapsedToggler);
        i.addClass(this.opts.classes.expandedToggler);
        $(a).siblings('ul').slideDown('fast');
      },

      _sanitizePath: function(path) {
        if(path[0] == '#') {
          return path;
        } else {
          return '#'+path;
        }
      }
  };

  // Global properties and methods get attached to `$`
  // as opposed to `$.fn` so they can be extended from the outside
  global = {};

  // Add the plugin to the jQuery namespace and set-up the boilerplate base
  $.newPlugin(pluginName, defaults, methods, global);

}(jQuery, window, document));
