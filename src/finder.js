(function($, win, doc, undefined) {

  var pluginName, defaults, methods, global;

  // The name of your plugin
  pluginName = 'dtfinder';

  // Default options
  defaults = {
      url: null,
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

        DTFINDER.config = this.opts
        DTFINDER.config.data = $.extend( {}, defaults.data, this.opts.data);
        DTFINDER.config.permissions = $.extend( {}, defaults.permissions, this.opts.permissions);

        this._caches = {};
        this._caches.loaded = [];
        this._caches.data = [];
        
        DTFINDER.File.url = this.opts.url;
        DTFINDER.File.data = this.opts.data;

        this.createElements(this.el, this.opts);
        this.initTree();

        this.listen(this.el, this.opts);

        this.openRoot();
    },

    initTree: function() {
            var data = [{path: '/', label: '/', type: 'dir'}]
            //var roots = this.buildList(data);
            var _this = this;

            this.nav.dttree({
                initData: data,
                onBeforeExpand: function(path, dttree) {

                    path = path.substr(1);
                    if($.inArray(path, _this._caches.loaded) === -1) {

                        var data = DTFINDER.File.list(path);
                        //save data
                        _this._caches.data[path] = data;

                        _this._caches.loaded.push(path);
                    }

                    dttree.setChildren(_this._caches.data[path], path);
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

            $('#sub-browser-dialog').on('click', 'a.dttree-node', function(e){
                e.preventDefault();
                var a = e.currentTarget;
                $('#sub-browser-dialog').find('.selected').removeClass('selected');
                $(a).addClass('selected');
            });

            // context menu
            if(options.manage) {
               this.listenContextMenu(el);
            }

            this.listenUpload(this._currentPath);
            this.listenCreateFolder(this._currentPath);
            this.listenRename();
            this.listenSearch();

            // item click
            $(el).on('click', '.dtf-file-item a', function(e){
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

            if($.inArray(path, this._caches.loaded) === -1) {

                var data = DTFINDER.File.list(path);
                //save data
                this._caches.data[path] = data;

                this._caches.loaded.push(path);
            }
            
            //upload
            this.listenUpload(path);
            this.listenCreateFolder(path);

            this.updateBrowser(this._caches.data[path]);
            this.handleHight();
        },

        listenSearch: function(){
            var _this = this;
            $(document).on('keyup', '.dt-search-input', function(){
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
                    .children('.file-name')
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
                    .children('.file-name')
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
        },

        listenUpload: function(p) {

            var data = $.extend({
                    path: p,
                    op: 'upload'
               }, this.opts.data);

            $('#upload-form').ajaxForm({
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

            $('#new-folder-form').ajaxForm({
               data: data,
               success: $.proxy(function(data){
                    this.refresh(p);
                    $('#new-folder-dialog').modal('hide');
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

            var holder = $(context).data('context-holder');

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
                    var fileNameDiv = $(holder).find('.file-name');
                    var file = fileNameDiv.text();
                    fileNameDiv.hide();
                    
                    $(holder).append('<div><input data-path="'+path+'" type="text" style="height:18px;" class="form-control input-sm dt-rename-input" value="'+file+'"></div>');
                    $(holder).find('.dt-rename-input').select();
                    
                break;

                case 'new-folder':

                    $('#new-folder-dialog').on('shown.bs.modal', function () {
                        $('.new-folder-input').select();
                    });
                    
                    $('#new-folder-dialog').modal('show');
                    return;
                break;
                
                case 'move':

                    $('#sub-browser-dialog .modal-body').dttree({
                        initData: [{
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
                    $('#sub-browser-dialog').on('click', '.folder-selector', function(){
                        var href = $('#sub-browser-dialog').find('.selected').attr('href').substr(1);

                        DTFINDER.File.move(path, href);
                        parent.refresh();

                        $('#sub-browser-dialog').modal('hide');
                    });

                    $('#sub-browser-dialog').modal('show');
                break;

                case 'properties':

                    // if no path, we just well use current path
                    if(!path) {
                        path = this._currentPath;
                    }

                    var file = DTFINDER.File.properties(path);

                    var html = [
                        '<table>',
                            '<tr><td class="property-label" valign="top" width="70px;">Name</td><td>'+file.Name+'</td></tr>',
                            '<tr><td class="property-label" valign="top" width="70px;">Type</td><td>'+file.Type+'</td></tr>',
                            '<tr><td class="property-label" valign="top" width="70px;">Size</td><td>'+file.Size+'</td></tr>',
                            '<tr><td class="property-label" valign="top" width="70px;">Location</td><td>'+file.Location+'</td></tr>',
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
            var ul = DTFINDER.DOM.create('UL');

            for(var i=0; i<data.length; i++ ) {
                    
                var node = DTFINDER.DOM.createFileItem(data[i]);
                $(ul).append(node);
            }

            $(this.browserArea).html(ul)
        },

        refresh: function(path) {

            if(typeof path == 'undefined') {
                path = this._currentPath;
            }

            data = DTFINDER.File.list('/'+path);
            this._caches.data[path] = data;
            this.updateBrowser(data);

            //remove path from loaded
            
            for(var i = this._caches.loaded.length-1; i--;){
                if (this._caches.loaded[i].trim() == path.trim() ) this._caches.loaded.splice(i, 1);
            }

            this._caches.loaded = [];

            this.nav.dttree('expand', path);
        },
        /*
         * Create browser elements, called in init
         */
        createElements: function(el, options) {

            this.nav = $('<div/>').addClass('dtf-nav ctn');
            this.browserArea = $('<div/>').
              addClass('dtf-area ctn dtf-context-holder').
              data('context-target', '#bro-context-menu') ;

            var row = $('<div/>').addClass('row');

            var wrapper = $('<div/>').addClass('wrapper container-fluid');

            var toolBar = DTFINDER.DOM.createToolbar();

            var uploadUrl = this.opts.uploadUrl || this.opts.url;
            var uploadDialog = DTFINDER.DOM.createUploadDialog(uploadUrl);

            var createFolderUrl = this.opts.createFolderUrl || this.opts.url;
            var newFolderDialog = DTFINDER.DOM.createNewFolderDialog(createFolderUrl);
            var subBrowserDialog = DTFINDER.DOM.createSubBrowserDialog();
            var propertiesDialog = DTFINDER.DOM.createPropertiesDialog();

            var itemContext = DTFINDER.DOM.createItemContext();
            var broContext = DTFINDER.DOM.createBrowserContext();

            $(row)
                .append(this.nav)
                .append(this.browserArea)

            $(wrapper)
                .append(toolBar)
                .append(row)

            $(el)
                .width(options.width)
                .append(wrapper)
                .after(itemContext)
                .after(broContext)
                .after(uploadDialog)
                .after(newFolderDialog)
                .after(subBrowserDialog)
                .after(propertiesDialog);
        },
  };

  // Global properties and methods get attached to `$`
  // as opposed to `$.fn` so they can be extended from the outside
  global = {

  };

  // Add the plugin to the jQuery namespace and set-up the boilerplate base
  $.newPlugin(pluginName, defaults, methods, global);

}(jQuery, window, document));