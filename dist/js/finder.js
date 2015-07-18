/**!
 * Advanced jQuery Plugin Boilerplate
 * @author: Cedric Ruiz
 * https://github.com/elclanrs/advanced-jquery-boilerplate
 */
(function($) {

  var AP = Array.prototype;

  $.newPlugin = function(pluginName, defaults, methods, global) {

    function Plugin(element, options) {

      this.opts = $.extend({}, defaults, options);
      this.el = element;

      this._name = pluginName;

      this._init();
    }

    Plugin.prototype._init = $.noop;

    Plugin.prototype[pluginName] = function(method) {
      if (!method) return this;
      try { return this[method].apply(this, AP.slice.call(arguments, 1)); }
      catch(e) {}
    };

    $.extend(Plugin.prototype, methods);

    if (global) $[pluginName] = global;

    $.fn[pluginName] = function() {

      var args = AP.slice.call(arguments)
        , method = typeof args[0] == 'string' && args[0].split(':')
        , opts = typeof args[0] == 'object' && args[0]
        , params = args.slice(1)
        , isGet = method[0] == 'get'
        , ret;

      this.each(function() {

        var instance = $.data(this, pluginName);

        // Method
        if (instance) {
          return ret = instance[pluginName].apply(instance, [method[+isGet]].concat(params));
        }

        // Init
        return $.data(this, pluginName, new Plugin(this, opts));
      });

      return isGet ? ret : this;
    };
  };

}(jQuery));;window.DTFINDER = (function(){

    return {
        lang: [],
        config: {
            data: {},
            classes: {},
            permissions: {}
        }
    }
})();
;DTFINDER.Locale = {

	locale: null,

	localize: function(string) {

		if(typeof DTFINDER.lang[this.locale] == 'undefined' ) {
			return string;
		} else {
			if(typeof DTFINDER.lang[this.locale][string] == 'undefined' ) {

				if(this.local !== 'en') {
					console.warn("Missing translation: '"+string+"' for locale "+ this.locale);
				}

				return string;
			}

			return DTFINDER.lang[this.locale][string];
		}
	}
}
;(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["file-item.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<li class=\"dtf-file-item dtf-context-holder\" data-context-target='#item-context-menu' data-file-type=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "file")),"type", env.opts.autoescape), env.opts.autoescape);
output += "\">\n    <a tabindex=\"-1\" class=\"\" href=\"";
output += runtime.suppressValue("#/" + runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "file")),"path", env.opts.autoescape), env.opts.autoescape);
output += "\">\n        <div class=\"dtf-file-img\">\n            ";
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "file")),"type", env.opts.autoescape) == "image") {
output += "\n                <img src=\"";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "file")),"base64", env.opts.autoescape), env.opts.autoescape);
output += "\" class=\"ui-li-thumb\">\n            ";
;
}
else {
if(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "file")),"type", env.opts.autoescape) == "file") {
output += "\n                    <i class=\"fa fa-file-o\"></i></div>\n            ";
;
}
else {
output += "\n                    <i class=\"fa fa-folder-o\"></i></div>\n            ";
;
}
;
}
output += "\n        </div>\n        <!-- @todo thumb -->\n        <!--<img src=\"\" class=\"ui-li-thumb\">-->\n        <div class=\"dtf-file-desc\">";
output += runtime.suppressValue(runtime.memberLookup((runtime.contextOrFrameLookup(context, frame, "file")),"label", env.opts.autoescape), env.opts.autoescape);
output += "</div>\n    </a>\n    <div class=\"dtf-item-context\">\n        <a href=\"#\" class=\"dtf-mobile-item-context\"><i class=\"fa fa-angle-down\"></i></a>\n    </div>\n</li>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["mobile-context-menu.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<span class=\"mobile-context-menu dropdown pull-right\"><a data-toggle=\"dropdown\" href=\"#\" style=\"font-size:1.4em\"><i class=\"fa fa-angle-down\"></i></a>\n    <ul class=\"dropdown-menu\" aria-labelledby=\"dropdownMenu1\">\n        <li><a data-path=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "path"), env.opts.autoescape);
output += "\" data-op=\"rename\" class=\"dtf-mobile-context-action\" href=\"#\">";
output += runtime.suppressValue((lineno = 2, colno = 96, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "_"), "_", ["Rename"])), env.opts.autoescape);
output += "</a></li>\n        <li><a data-path=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "path"), env.opts.autoescape);
output += "\" data-op=\"move\" class=\"dtf-mobile-context-action\" href=\"#\">";
output += runtime.suppressValue((lineno = 3, colno = 94, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "_"), "_", ["Move"])), env.opts.autoescape);
output += "</a></li>\n        <li><a data-path=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "path"), env.opts.autoescape);
output += "\" data-op=\"delete\" class=\"dtf-mobile-context-action\" href=\"#\">";
output += runtime.suppressValue((lineno = 4, colno = 96, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "_"), "_", ["Delete"])), env.opts.autoescape);
output += "</a></li>\n        <li><a data-path=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "path"), env.opts.autoescape);
output += "\" data-op=\"properties\" class=\"dtf-mobile-context-action\" href=\"#\">";
output += runtime.suppressValue((lineno = 5, colno = 100, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "_"), "_", ["Properties"])), env.opts.autoescape);
output += "</a></li>\n    </ul>\n</span>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["modal.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div id=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "id"), env.opts.autoescape);
output += "\" class=\"modal in\">\n    <div class=\"modal-dialog ";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "size"), env.opts.autoescape);
output += "\">\n        <div class=\"modal-content\">\n            <div class=\"clearfix\">\n                <button style=\"margin:5px 15px;\" aria-label=\"Close\" data-dismiss=\"modal\" class=\"close\" type=\"button\"><span aria-hidden=\"true\">×</span></button>\n            </div>\n            <div class=\"modal-body\">";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "content"), env.opts.autoescape);
output += " </div>\n        </div>\n    </div>\n</div\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["new-folder-form.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<form method=\"GET\" class=\"form clearfix\" id=\"dtf-new-folder-form\" action=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "createFolderUrl"), env.opts.autoescape);
output += "\">\n    <div class=\"form-group\">\n        <label class=\"control-label\">";
output += runtime.suppressValue((lineno = 2, colno = 39, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "_"), "_", ["New Folder"])), env.opts.autoescape);
output += "</label>\n        <input type=\"text\" name=\"folder-name\" value=\"New Folder\" class=\"form-control new-folder-input\"/>\n    </div>\n    <div class=\"form-group\">\n        <input type=\"submit\" class=\"btn btn-sm btn-primary pull-right\" value=\"";
output += runtime.suppressValue((lineno = 6, colno = 80, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "_"), "_", ["Submit"])), env.opts.autoescape);
output += "\"/>\n        <a href=\"javascript:;\" class=\"btn btn-default btn-sm pull-right\" data-dismiss=\"modal\" style=\"margin-right:5px\">";
output += runtime.suppressValue((lineno = 7, colno = 121, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "_"), "_", ["Cancel"])), env.opts.autoescape);
output += "</a>\n    </div>\n</form>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["sub-browser.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div><button class=\"btn btn-xs pull-right btn-primary folder-selector\">";
output += runtime.suppressValue((lineno = 0, colno = 73, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "_"), "_", ["Select"])), env.opts.autoescape);
output += "</button></div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["template.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<div id=\"dtf\">\n    <div class=\"container\">\n        <div class=\"row dtf-row\">\n            <div class=\"dt-col col-md-6\">\n                <a href=\"#\" data-toggle=\"modal\" data-target=\"#dtf-upload-dialog\" class=\"btn btn-success btn-sm\">\n                    <i class=\"fa fa-upload\" style=\"\"></i> Upload\n                </a>\n\n                <a href=\"#\" data-toggle=\"modal\" data-target=\"#dtf-new-folder-dialog\" class=\"btn btn-default btn-sm\">\n                    <i class=\"fa fa-folder-o\"></i> New Folder\n                </a>\n            </div>\n            <div class=\"dt-col col-md-6\">\n                <div class=\"row\">\n                    <div class=\"col-md-5 col-md-offset-7\">\n                        <input class=\"form-control input-sm dtf-search-input\" placeholder=\"Search\" type=\"search\"/>\n                    </div>\n                </div>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-md-12\">\n                <div id=\"dtf-breadcrumb-container\">\n                    <a id=\"dtf-parent-folder\" href=\"#\">\n                        <i class=\"fa fa-reply\"></i>\n                    </a>\n                    <span id=\"dtf-breadcrumb\"> </span>\n                </div>\n            </div>\n        </div>\n        <div class=\"row\">\n            <div class=\"col-md-12\">\n                <div class=\"dtf-desktop-area\">\n                    <div id=\"dtf-tree\"></div>\n                    <div id=\"dtf-area\" class=\"dtf-context-holder\" data-context-target='#bro-context-menu'></div>\n                </div>\n            </div>\n        </div>\n    </div>\n</div>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();
(function() {(window.nunjucksPrecompiled = window.nunjucksPrecompiled || {})["upload-form.html"] = (function() {function root(env, context, frame, runtime, cb) {
var lineno = null;
var colno = null;
var output = "";
try {
output += "<form method=\"POST\" enctype=\"multipart/form-data\" class=\"form clearfix\" id=\"dtf-upload-form\" action=\"";
output += runtime.suppressValue(runtime.contextOrFrameLookup(context, frame, "uploadUrl"), env.opts.autoescape);
output += "\">\n    <input multiple type=\"file\" name=\"files[]\">\n    <div class=\"uploaded\"></div>\n    <input type=\"submit\" class=\"btn btn-primary btn-sm pull-right\" value=\"";
output += runtime.suppressValue((lineno = 3, colno = 76, runtime.callWrap(runtime.contextOrFrameLookup(context, frame, "_"), "_", ["Submit"])), env.opts.autoescape);
output += "\">\n</form>\n";
cb(null, output);
;
} catch (e) {
  cb(runtime.handleError(e, lineno, colno));
}
}
return {
root: root
};
})();
})();

;DTFINDER.DOM = {


    _render: function(template, param) {
        var param = $.extend(param,{
            _: function(str) {
                    return DTFINDER.Locale.localize(str);
                }
        });
        return nunjucks.render(template, param);
    },

    // Create element
    create: function(name, attr) {
        var el = document.createElement(name);

        if(typeof attr != 'undefined') {
            $.each( attr, function( key, value ) {
                $(el).attr(key, value);
            });
        }

        return $(el);
    },

    createBreadcrumb:function(){
        return this._render(DTFINDER.Template.breadcrumb());
    },

    createToolbar: function(){
        return this._render(DTFINDER.Template.toolbar());
    },

    createUploadDialog: function(uploadUrl){

        var content = this._render('upload-form.html', {uploadUrl:uploadUrl});
        return this.createModal('dtf-upload-dialog', content);
    },

    createNewFolderDialog: function(createFolderUrl){

        var param = { createFolderUrl: createFolderUrl }

        var content = this._render('new-folder-form.html', param);

        return this.createModal('dtf-new-folder-dialog', content, 'modal-sm');
    },

    createSubBrowserDialog: function(){

        var content = this._render('sub-browser.html');
        return this.createModal('dtf-sub-browser-dialog', content, 'modal-sm');
    },

    createPropertiesDialog: function(){
        return this.createModal('properties-dialog', '', 'modal-sm');
    },

    createModal: function(id, content, size) {

        var size = size || '';
        return this._render('modal.html', {id:id, content:content, size: size});
    },

    createBrowserContext: function() {

        var context = {};

        if(DTFINDER.config.permissions.create) {
            context['new-folder'] = DTFINDER.Locale.localize('New Folder')+'\u2026'
        }

        context.properties = DTFINDER.Locale.localize('Properties');
        return this.createContextMenu('bro-context-menu', context);
    },

    // right click context menu
    createItemContext: function() {

        var context = {};

        if(DTFINDER.config.permissions.move) {
            context.rename =  DTFINDER.Locale.localize('Rename')
            context.move = DTFINDER.Locale.localize('Move')+'\u2026'
        }

        if(DTFINDER.config.permissions.delete) {
            context.delete = DTFINDER.Locale.localize('Delete')+'\u2026'
        }

        context.properties = DTFINDER.Locale.localize('Properties');
        return this.createContextMenu('item-context-menu', context);
    },

    createContextMenu: function(id, menu){

        var dropUL = this.create('UL', {role: 'menu'}).addClass('dropdown-menu');

        $.each(menu, $.proxy(function(key, value) {
            var li = this.createContextAction(key, value);
            $(dropUL).append(li);
        }, this));

        var contextWrapper = this.create('DIV', {
            id: id
        }).append(dropUL);

        return contextWrapper;
    },

    // context action
    createContextAction: function(act, text) {
        var a = this.create('A', {href: '#'}).text(text);
        var li = this.create('LI', {'data-action': act}).append(a);

        return li;
    },

    createFileItem: function(file) {

        /*var li = this.create('LI').addClass('dtf-item dtf-context-holder');
        li.data('context-target', '#item-context-menu');

        if(file.type == 'image') {
             var icon = this.create('IMG',{
                src: file.base64
             })
                .addClass('icon')

            $(li).addClass('img-item');

        } else {

            if(file.type == 'file') {
                var faClass = 'fa fa-file-o';
                $(li).addClass('dtf-file-item');

            } else if(file.type == 'dir') {
                var faClass = 'fa fa-folder-o';

                $(li).addClass('dtf-folder-item');
            } else {
                var faClass = null;
            }

            var icon = this.create('I')
                .addClass('icon')
                .addClass(faClass);
        }

        var a = this.create('A', {href: '#/'+file.path})
            .append(icon)
            .append('<span style="overflow: hidden;text-overflow: ellipsis;" class="file-name">'+file.label+'</span>');

        var mobileContextMenu = this._render('mobile-context-menu.html', {path: file.path});
        $(li)
            .append(a)
            .append(mobileContextMenu);

        return li;

            */
        return this._render('file-item.html', {file:file});
    }
}
;(function($, win, doc, undefined) {

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
;DTFINDER.File = {

    url: null,
    data: {},

    list: function(path){
        var data = {op: 'ls', path: path }
        return this._sendRequest('GET', data, true)
    },

    move: function(path, dest) {

        var data = {
            op: 'move',
            path:path,
            dest: dest
        }
        return this._sendRequest('POST', data)
    },

    rename: function(path, newName){

        var data = {
            op: 'rename',
            path:path,
            newName: newName
        }

        return this._sendRequest('POST', data)
    },

    delete: function(path){
        var data = {op: 'delete', path: path }
        return this._sendRequest('POST', data, true)
    },

    properties: function(path) {
        var data = {op: 'properties', path: path }
        return this._sendRequest('GET', data, true)
    },

    search: function(q, path) {
        var data = {op: 'search', path: path, q:q}
        return this._sendRequest('GET', data, true)
    },

    _sendRequest: function(type, data, ret) {

        data = $.extend(data, this.data);

        var ajax = $.ajax({
            url: this.url,
            data: data,
            type: type,
            async: false
        })

        if(typeof ret !== 'undefined' && ret === true) {
            var r;
            ajax.done(function(res){
                r = res;
            });

            return r;
        }
    }
};DTFINDER.Layout = {

    handleScreenSize: function(){
        var wW = $(window).innerWidth();

        if(wW <= 756) {
            $('.dtf-breadcrumb-container').show();
            $('.dtf-nav').hide();
            $('.toolbar').css({margin: '5px'});
            $('.dtf-area').width('98%');
        } else {
            $('.dtf-breadcrumb-container').hide();
            $('.dtf-nav').show();
            $('.toolbar').css({margin: '0px'});

            var w = $('.dtf-browser-container').width() - $('.dtf-nav').width();
            $('.dtf-area').width(w-35);
        }

    },

    listenWindowResize: function(){
        var _this = this;
        $(window).resize(function(){
            _this.handleScreenSize();
        });
    }
}
;(function($, win, doc, undefined) {

  var pluginName, defaults, methods, global;

  // The name of your plugin
  pluginName = 'dtfinder';

  // Default options
  defaults = {
      url: null,
      locale: 'en',
      manage: true,
      upload: true,
      uploadUrl: null,
      width: '100%',
      height: 600,
      onSelect: false,
      permissions: {
          create: true,
          delete: true,
          move: true
      },
      data: {}
  };

  // Public methods
  methods = {

    // Gets called when creating a new instance
    // this.el is the element on which the plugin was called
    // this.opts contains the options passed to the plugin
    _init: function() {

        this._currentPath = '/';
        this._loadedPaths = [];
        this._cache = [];

        DTFINDER.config = this.opts
        DTFINDER.config.data = $.extend( {}, defaults.data, this.opts.data);
        DTFINDER.config.permissions = $.extend( {}, defaults.permissions, this.opts.permissions);


        DTFINDER.File.url = this.opts.url;
        DTFINDER.File.data = this.opts.data;
        DTFINDER.Locale.locale = this.opts.locale;

        this.createElements(this.el, this.opts);
        this.initTree();

        this.listen(this.el, this.opts);

        this.openRoot();

        DTFINDER.Layout.handleScreenSize();
        DTFINDER.Layout.listenWindowResize();
    },

    initTree: function() {
            var data = [{path: '/', label: '/', type: 'dir'}]
            //var roots = this.buildList(data);
            var _this = this;

            this.nav.dttree({
                nodes: data,
                onBeforeExpand: function(path, dttree) {

                    path = path.substr(1);
                    if($.inArray(path, _this._loadedPaths) === -1) {

                        var data = DTFINDER.File.list(path);
                        //save data
                        _this._cache[path] = data;

                        _this._loadedPaths.push(path);
                    }

                    dttree.setChildren(_this._cache[path], path);
                    _this.handleHight();
                }
            });
    },
    /*
         * Open first created root
         */
        openRoot: function(){
            var path = window.location.hash.substr(1);
            if(!path) {
                path = '/';
                window.location.hash = '/';

                var a = $('a[href="#'+path+'"]');
                this.nav.dttree('expand', path);

            } else {

                var x = path.split('/');
                var s = '';
                var p = '/';
                while(x.length !== 0) {
                    s = s+x.shift()+'/';
                    s.trim();

                    if(s != '/') {
                        p = s.substr(0,s.length-1);
                    }

                    this.nav.dttree('expand', p);
                }
            }

            this.open(path);
        },


        listen: function (el, options) {

            var parent = this;

            window.onpopstate = function(e){
                var path = window.location.hash.substr(1);
                parent.open(path);
            };

            $('#dtf-sub-browser-dialog').on('click', 'a.dttree-node', function(e){
                e.preventDefault();
                var a = e.currentTarget;
                $('#dtf-sub-browser-dialog').find('.selected').removeClass('selected');
                $(a).addClass('selected');
            });

            // context menu
            if(options.manage) {
               this.listenContextMenu(el);
            }

            this.listenCreateFolder(this._currentPath);
            this.listenUpload(this._currentPath);
            this.listenRename();
            this.listenSearch();

            // file (not directory) click
            $(el).on('click', 'li[data-file-type="file"] a', function(e){
                e.preventDefault();
            });

            // item image
            $(el).on('click', '.img-item a', function(e){
                e.preventDefault();

                if($.isFunction(options.onISelect)) {
                    options.onISelect(e);
                }
            });

        },

        open: function(path) {

            this._currentPath = path;

            if($.inArray(path, this._loadedPaths) === -1) {

                var data = DTFINDER.File.list(path);
                //save data
                this._cache[path] = data;

                this._loadedPaths.push(path);
            }

            //upload
            this.listenUpload(path);
            this.listenCreateFolder(path);

            this.updateBrowser(this._cache[path]);
            this.handleHight();

            var parent = this.getParent(path)
            path = this.createBreadcrumb(path);

            $('#dtf-parent-folder').attr('href','#'+parent);
            $('#dtf-breadcrumb').html(path);
        },

        createBreadcrumb: function(path) {
            var tmp = path.substr(1).split('/');

            var bc = '#';
            var bcs = ''
            for(var i=0; i<tmp.length; i++) {
                bc += '/'+tmp[i];
                bcs += '/<a href="'+bc+'">'+tmp[i]+'</a>';
            }

            return bcs;
        },

        getParent: function(path) {
            var tmp = path.split('/');
            tmp.pop();
            return tmp.join('/') ? tmp.join('/') : '/';
        },

        listenSearch: function(){
            var _this = this;
            $(document).on('keyup', '.dtf-search-input', function(){
                var q = $(this).val();
                if(q.length > 0) {
                    var data = DTFINDER.File.search(q, _this._currentPath);

                    //update browser
                    _this.updateBrowser(data);
                } else {
                    _this.open(_this._currentPath);
                }
            });
        },

        listenRename: function(){
            var KEYCODE_ENTER = 13;
            var KEYCODE_ESC = 27;
            var parent = this;
            $(document).on('keyup', '.dt-rename-input', function(e){
                if(e.keyCode == KEYCODE_ESC || e.which == KEYCODE_ESC) {
                    $( e.target).parent()
                    .siblings('a')
                    .children('.dtf-file-desc')
                    .show();

                    $( e.target).parent().remove();
                }

                if(e.keyCode == KEYCODE_ENTER || e.which == KEYCODE_ENTER) {

                    var path = $(this).data('path');
                    var newName = $(this).val();

                    DTFINDER.File.rename(path, newName);

                   $( e.target).parent()
                        .siblings('a')
                        .children('.file-name')
                        .text(newName).show();

                   $( e.target).parent().remove();

                    parent.refresh();
                }
            });

            $(document).on('blur', '.dt-rename-input', function(e){
                $( e.target).parent()
                    .siblings('a')
                    .children('.dtf-file-desc')
                    .show();

                $( e.target).parent().remove();
            });
        },


        listenContextMenu: function (el){

            $(el).contextmenu({
              onItem: $.proxy(this.handleContext, this),
              before: function (e, element, target) {

                    var contextTarget = null;

                    if($(e.target).hasClass('dtf-context-holder')) {

                        $(el).data('context-holder', e.target);
                        contextTarget = $(e.target).data('context-target');
                    } else {

                        var containers = $(e.target).parents();

                        $.each(containers, function(key, value){
                            if($(value).hasClass('dtf-context-holder')) {

                                $(el).data('context-holder', value);
                                contextTarget = $(value).data('context-target');
                                return false;
                            }
                        });
                    }

                    if(null === contextTarget) {
                        return false;
                    }

                    $(el).data('target', contextTarget);
                    return true;
                  }
            });


            //mobile context menu
            $(document).on('click','.dtf-item-context a', function(e){
                e.preventDefault();
                $(el).data('context').show(e);
            });
        },

        listenUpload: function(p) {

            var data = $.extend({
                    path: p,
                    op: 'upload'
               }, this.opts.data);

            $('#dtf-upload-form').ajaxForm({
               data: data,
               success: $.proxy(function(data){
                    this.refresh(p);

                    for(var i=0;i<data.length;i++) {
                        $('.uploaded').append('<p> New file: '+data[i].uploaded+'</p>');
                    }

               }, this)
            });
        },

        listenCreateFolder: function(p) {

            var data = $.extend({
                    path: p,
                    op: 'mkdir'
               },  this.opts.data);

            $('#dtf-new-folder-form').ajaxForm({
               data: data,
               success: $.proxy(function(data){
                    this.refresh(p);
                    $('#dtf-new-folder-dialog').modal('hide');
               }, this)
            });
        },

        handleHight: function() {
            var h = $('.dtf-area').height();
            $('.dtf-nav').height(h);
        },

        handleContext: function(context, e) {

            e.preventDefault();

            var op = $(e.target).parent().data('action');

            console.log(context);

            if(context.hasClass('dtf-mobile-item-context')) {
                // context is for mobile
                var holder = $(context).closest('li.dtf-context-holder');
            } else {
                var holder = $(context).data('context-holder');
            }

            var path = $(holder).children('a').attr('href');

            switch(op) {
                case 'delete':

                    if(confirm('Are you sure you want to delete '+path+' ?, this cannot be undone.')) {
                        var res = DTFINDER.File.delete(path);
                        this.refresh();
                    } else {
                        return false;
                    }

                break;

                case 'rename':
                    var fileNameDiv = $(holder).find('.dtf-file-desc');
                    var file = fileNameDiv.text();
                    fileNameDiv.hide();

                    $(holder).append('<div><input data-path="'+path+'" type="text" class="dt-rename-input" value="'+file+'"></div>');
                    $(holder).find('.dt-rename-input').select();

                break;

                case 'new-folder':

                    $('#dtf-new-folder-dialog').on('shown.bs.modal', function () {
                        $('.new-folder-input').select();
                    });

                    $('#dtf-new-folder-dialog').modal('show');
                    return;
                break;

                case 'move':

                    $('#dtf-sub-browser-dialog .modal-body').dttree({
                        nodes: [{
                            path: '/',
                            label: '/',
                            type: 'dir'
                        }],
                        onBeforeExpand: function(path, dttree) {

                            path = path.substr(1);
                            var data = DTFINDER.File.list(path);
                            dttree.setChildren(data, path);
                        }
                    });

                    var parent = this;
                    $('#dtf-sub-browser-dialog').on('click', '.folder-selector', function(){
                        var href = $('#dtf-sub-browser-dialog').find('.selected').attr('href').substr(1);

                        DTFINDER.File.move(path, href);
                        parent.refresh();

                        $('#dtf-sub-browser-dialog').modal('hide');
                    });

                    $('#dtf-sub-browser-dialog').modal('show');
                break;

                case 'properties':

                    // if no path, we just well use current path
                    if(!path) {
                        path = this._currentPath;
                    }

                    var file = DTFINDER.File.properties(path);

                    var html = [
                        '<table>',
                            '<tr><td class="property-label" valign="top" width="70px;">'+DTFINDER.Locale.localize('Name')+'</td><td>'+file.Name+'</td></tr>',
                            '<tr><td class="property-label" valign="top" width="70px;">'+DTFINDER.Locale.localize('Type')+'</td><td>'+file.Type+'</td></tr>',
                            '<tr><td class="property-label" valign="top" width="70px;">'+DTFINDER.Locale.localize('Size')+'</td><td>'+file.Size+'</td></tr>',
                            '<tr><td class="property-label" valign="top" width="70px;">'+DTFINDER.Locale.localize('Location')+'</td><td>'+file.Location+'</td></tr>',
                        '</table>'
                    ].join('');

                    $('#properties-dialog').on('shown.bs.modal', function (e) {
                        $(this).find('.modal-body').html(html);
                    });

                    $('#properties-dialog').modal('show');

                break;

                default:
                break;
            }
        },

        updateBrowser: function (data){
            if(data.length) {
                var content = $('<ul/>').addClass('dtf-file-list');

                for(var i=0; i<data.length; i++ ) {

                    var node = DTFINDER.DOM.createFileItem(data[i]);
                    content.append(node);
                }

            } else {
                // @todo translate this
                var content = "<p>Folder empty.</p>";
            }

            $(this.browserArea).html(content);
        },

        refresh: function(path) {

            if(typeof path == 'undefined') {
                path = this._currentPath;
            }

            data = DTFINDER.File.list('/'+path);
            this._cache[path] = data;
            this.updateBrowser(data);

            //remove path from loaded

            for(var i = this._loadedPaths.length-1; i--;){
                if (this._loadedPaths[i].trim() == path.trim() ) this._loadedPaths.splice(i, 1);
            }

            this._loadedPaths = [];

            this.nav.dttree('expand', path);
        },
        /*
         * Create browser elements, called in init
         */
        createElements: function(el, options) {

            /*this.nav = $('<div/>').addClass('dtf-nav');
            this.browserArea = $('<div/>').
              addClass('dtf-area ctn dtf-context-holder').
              data('context-target', '#bro-context-menu');

            this.navMobile = DTFINDER.DOM.createBreadcrumb();

            var row = $('<div/>').addClass('dtf-browser-container clearfix').css({width:'100%'});

            var wrapper = $('<div/>').addClass('dtf-contianer clearfix');

            $(row)
                .append(this.nav)
                .append(this.browserArea)

            $(wrapper)
                .append(toolBar)
                .append(this.navMobile)
                .append(row)*/

            var uploadUrl = this.opts.uploadUrl || this.opts.url;
            var uploadDialog = DTFINDER.DOM.createUploadDialog(uploadUrl);
            var createFolderUrl = this.opts.createFolderUrl || this.opts.url;
            var newFolderDialog = DTFINDER.DOM.createNewFolderDialog(createFolderUrl);

            var itemContext = DTFINDER.DOM.createItemContext();
            var broContext = DTFINDER.DOM.createBrowserContext();
            var subBrowserDialog = DTFINDER.DOM.createSubBrowserDialog();
            var propertiesDialog = DTFINDER.DOM.createPropertiesDialog();

            $(el).html(nunjucks.render('template.html'))
                .after(uploadDialog)
                .after(newFolderDialog)
                .after(itemContext)
                .after(broContext)
                .after(newFolderDialog)
                .after(subBrowserDialog)
                .after(propertiesDialog);

            this.nav = $('#dtf-tree');
            this.browserArea = $('#dtf-area');

        },
  };

  // Global properties and methods get attached to `$`
  // as opposed to `$.fn` so they can be extended from the outside
  global = {

  };

  // Add the plugin to the jQuery namespace and set-up the boilerplate base
  $.newPlugin(pluginName, defaults, methods, global);

}(jQuery, window, document));
