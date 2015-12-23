(function($, win, doc, undefined) {

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

        this.initApp();
        this.initTree();

        //this.listen(this.el, this.opts);

        //this.openRoot();
    },

    initApp: function () {

        var fileModel = Backbone.Model.extend({
            defaults: {
                "thumbnail":"false",
                "base64":"false",
                "type":"file",
                "label":""
            },
            idAttribute: "path",
        });

        var _this = this;
        var files = Backbone.Collection.extend({
            modal: fileModel,
            url: _this.opts.url
        });

        DTFINDER.files = new files();

        DTFINDER.files.fetch({data:{'op':'ls', 'path':'/'}});

        console.log(DTFINDER.files.models);
    },

    initTree: function() {
            var _this = this;
            var data = [{path: '/', label: '/', type: 'dir'}]

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

        listenUrl: function(){
            var _this = this
            window.onpopstate = function(e){
                var path = window.location.hash.substr(1);
                _this.open(path);
            };
        },

        listenMoveBrowser: function(){

            var moveBrowser = $('#dtf-sub-browser-dialog');

            moveBrowser.on('click', 'a.dttree-node', function(e){
                e.preventDefault();
                var a = e.currentTarget;
                moveBrowser.find('.selected').removeClass('selected');
                $(a).addClass('selected');
            });
        },

        listenFileItemClick: function(el, options){

            // file (not directory) click
            $(el).on('click', 'li[data-file-type="file"] a', function(e){
                e.preventDefault();
            });

            // item image
            $(el).on('click', '.dtf-file-item img', function(e){
                e.preventDefault();

                if($.isFunction(options.onISelect)) {
                    options.onISelect(e);
                }
            });
        },

        listen: function (el, options) {

            this.listenUrl();
            this.listenMoveBrowser();

            // context menu
            if(options.manage) {
               this.listenContextMenu(el);
            }

            this.listenCreateFolder(this._currentPath);
            this.listenUpload(this._currentPath);
            this.listenRename();
            this.listenSearch();
            this.listenFileItemClick(el, options);
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

                    var html = DTFINDER.DOM._render('properties.html', file);

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

            var uploadUrl = this.opts.uploadUrl || this.opts.url;
            var uploadDialog = DTFINDER.DOM.createUploadDialog(uploadUrl);
            var createFolderUrl = this.opts.createFolderUrl || this.opts.url;
            var newFolderDialog = DTFINDER.DOM.createNewFolderDialog(createFolderUrl);

            var itemContext = DTFINDER.DOM.createItemContext();
            var broContext = DTFINDER.DOM.createBrowserContext();
            var subBrowserDialog = DTFINDER.DOM.createSubBrowserDialog();
            var propertiesDialog = DTFINDER.DOM.createPropertiesDialog();

            $(el).html(nunjucks.render('template.html'))
                .after(itemContext)
                .after(broContext)
                .after(uploadDialog)
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
