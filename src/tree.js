(function($, win, doc, undefined) {

  var pluginName, defaults, methods, global;

  // The name of your plugin
  pluginName = 'dttree';

  // Default options
  defaults = {
    initData: [],
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
        var root = this._buildList(this.opts.initData);
        $(this.el).append(root);

      this._listen();
    },

   _listen: function() {
          // listening...
          var _this = this;
          $(this.el).on('click', 'a.dttree-node-toggler', function(e){
              e.preventDefault();

              var a = $(this).siblings('.dttree-node');

              //console.log($(this).children('i').hasClass(_this.opts.classes.expandedToggler));
              var path = a.attr('href');

              if($(this).children('i').hasClass(_this.opts.classes.expandedToggler)) {
                  _this.collapse(path);
              } else {
                  _this.expand(path);
              }
          });
      },

    // data prototype:
    // var data = [{path: '/', label: '/', type: 'dir'}]
    // path and label is mandatory
    _buildList: function (data, filter){

          if(data.length > 0) {
              var ul =  this._create('UL');
              
              for(i=0; i<data.length; i++ ) {
                  
                  if(data[i].type === 'dir') {
                      var node = this._createNode(data[i].path, data[i].label);
                      $(ul).append(node);
                  }
              }
              return ul;
          }

          return null;
      },

      _createNode: function(path, label) {

          var togglerIcon = this._create('I').addClass(this.opts.classes.collapsedToggler);

          path = path === '/' ? '' : path;
          
          var a = this._create('A', {href: '#/'+path})
              .addClass('dttree-node')
              .append(' '+label);
          
          var toggler = this._create('A', {href: '#'})
              .addClass('dttree-node-toggler')
              .append(togglerIcon);

          var li = this._create('LI')
              .append(toggler)
              .append(a);

          return li;
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
        var html = this._buildList(childs);
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
  global = {

  };

  // Add the plugin to the jQuery namespace and set-up the boilerplate base
  $.newPlugin(pluginName, defaults, methods, global);

}(jQuery, window, document));