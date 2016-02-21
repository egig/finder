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
          collapsedToggler: 'fa fa-plus-square-o',
          expandedToggler: 'fa fa-minus-square-o'
    },
    filterNode: function(node) {
      return true
    }
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

              var node = toggler.data('node');

              if(typeof node.collapsed === 'undefined') {
                  _this.expand(node);
              } else {
                if(node.collapsed) {
                    _this.expand(node);
                } else {
                    _this.collapse(node);
                }
              }
          });
      },

    // data prototype:
    // var nodes = [{path: '/', text: '/'}]
    // path and label is mandatory
    _renderNodes: function (nodes, parent){

          if(nodes.length > 0) {
              var ul =  this._create(NODES_ELEMENT);
              $(ul).css('padding-left', "15px");
              $(ul).css('list-style', "none");

              for(i=0; i<nodes.length; i++) {

                if(this.opts.filterNode(nodes[i])) {                
                  var li = this._renderNode(nodes[i], parent);
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
      _renderNode: function(node, parent) {

          var text = node.text;

          // @todo replace special char
          node.id = node.text.replace(" ", "_");

          if(typeof(parent) !== 'undefined') {
            node.id = parent.id+"_"+node.id;
          }

          var path = node.path;

          var a = this._create('A', {href: path})
              .addClass('dttree-node')
              .append('&nbsp;'+text);

          $(a).data('node', node);

          var li = this._create(NODE_ELEMENT, {id: node.id});

          if($.isArray(node.nodes)) {
            var toggler = this._createNodeToggler(node, node.expand);
            toggler.data('node', node);
            li.append(toggler);
            }

          li.append(a);

          if($.isArray(node.nodes)) {
              var ul = this._renderNodes(node.nodes, node);
              li.append(ul);

              if(!node.expand) {
                $(ul).hide();
              }
          }

          return li;
      },

      // Creat node toggler and attach the node to it
      _createNodeToggler: function(node, expand) {

          var togglerClass = expand ? this.opts.classes.expandedToggler
            : this.opts.classes.collapsedToggler;

          var togglerIcon = this._create('I')
            .addClass(togglerClass);
          
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

      redraw: function(node) {


        var path = node.path

        var a = $('a[href="'+path+'"].dttree-node', this.el);
        var parent = a.parent('li');
        var html = this._renderNodes(node.nodes);
        
        $(html).hide();
        parent.append(html);
      },

      collapse: function(node) {
          path = node.path
          var a = $('a[href="'+path+'"]', this.el);
          var i = $(a).siblings('.dttree-node-toggler').children('i');

          i.removeClass(this.opts.classes.expandedToggler);
          i.addClass(this.opts.classes.collapsedToggler);

          $(a).siblings('ul').slideUp('fast');
          node.collapsed = true;
      },

      expand: function(node) {

        if($.isFunction(this.opts.onBeforeExpand)) {
          this.opts.onBeforeExpand(node, this);
        }

        var path = node.path

        var a = $('a[href="'+path+'"]', this.el);

        var i = $(a).siblings('.dttree-node-toggler').children('i');

        i.removeClass(this.opts.classes.collapsedToggler);
        i.addClass(this.opts.classes.expandedToggler);
        $(a).siblings('ul').slideDown('fast');

          node.collapsed = false;
      }
  };

  // Global properties and methods get attached to `$`
  // as opposed to `$.fn` so they can be extended from the outside
  global = {};

  // Add the plugin to the jQuery namespace and set-up the boilerplate base
  $.newPlugin(pluginName, defaults, methods, global);

}(jQuery, window, document));
