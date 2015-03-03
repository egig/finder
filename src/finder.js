/*!
 * Drafterbit Finder Jquery Plugin
 * Version: 0.1.0
 * Author: egig <egigundari@gmail.com>
 * https://github.com/drafterbit/finder
 *
 * Free file finder for web
 * make use of twbs and fontawesome.
 *
 * Licensed under MIT
 * ========================================================= */

;(function ($, window, document, DTFINDER) {

    // Create the defaults
    var pluginName = "dtfinder",
        defaults = {
            url: null,
            manage: true,
            upload: true,
            uploadUrl: null,
            width: '100%',
            height: 600,
            onSelect: false,
            classes: {
                collapse: 'fa fa-folder-o',
                expand: 'fa fa-folder-open-o'
            },
            permissions: {
                create: true,
                delete: true,
                move: true
            },
            data: {}
        };

    function Plugin( element, options ) {
        this.element = element;

        // The first object is generally empty because we don't
        // want to alter the default options for future instances
        // of the plugin
        this.options = DTFINDER.config = $.extend( {}, defaults, options);
        this.options.data = DTFINDER.config.data = $.extend( {}, defaults.data, options.data);
        this.options.classes = DTFINDER.config.classes = $.extend( {}, defaults.classes, options.classes);
        this.options.permissions = DTFINDER.config.permissions = $.extend( {}, defaults.permissions, options.permissions);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {

        init: function() {

            this._caches = {};
            this._caches.loaded = [];
            this._caches.data = [];
            
            DTFINDER.File.url = this.options.url;
            DTFINDER.File.data = this.options.data;

            this.createElements(this.element, this.options);
            this.initTree();

            this.listen(this.element, this.options);

            this.openRoot();
        },

        initTree: function() {
            var data = [{path: '/', label: '/', type: 'dir'}]
            var roots = this.buildList(data);

            this.nav.append(roots);

            // listening...
            var _this = this;
            $(this.nav).on('click', 'a.toggler', function(e){
                e.preventDefault();

                var a = $(this).siblings('.dtf-tree-node');
                
                if($(this).children('i').hasClass(_this.options.classes.expand)) {
                    _this.collapse(a);
                } else {
                    _this.expand(a);
                }

                _this.handleHight();
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
                this.expand(a);
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

                    var a = $('a[href="#'+p+'"]');
                    this.expand(a);
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

            $('#sub-browser-dialog').on('click', 'a.toggler', function(e){
                e.preventDefault();

                var a = $(this).siblings('.dtf-tree-node');
                
                if($(this).children('i').hasClass(parent.options.classes.expand)) {
                    parent.collapse(a);
                } else {
                    parent.expand(a);
                }
            });

            $('#sub-browser-dialog').on('click', 'a.dtf-tree-node', function(e){
                e.preventDefault();
                var a = e.currentTarget;
                $('#sub-browser-dialog').find('.selected').removeClass('selected');
                $(a).addClass('selected');
            });

            // context menu
            if(options.manage) {
               this.listenContextMenu(el);
            }

            this.listenUpload(this._caches.currentPath);
            this.listenCreateFolder(this._caches.currentPath);
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

            this._caches.currentPath = path;

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
                if(q.length > 1) {
                    var path = _this._caches.currentPath;
                    var data = DTFINDER.File.search(q, path);

                    //update browser
                    _this.updateBrowser(data);
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
               }, this.options.data);

            $('#upload-form').ajaxForm({
               data: data,
               success: $.proxy(function(data){
                    this.refresh(p);

                    for(i=0;i<data.length;i++) {
                        $('.uploaded').append('<p> New file: '+data[i].uploaded+'</p>');
                    }

               }, this)
            });
        },

        listenCreateFolder: function(p) {

            var data = $.extend({
                    path: p,
                    op: 'mkdir'
               },  this.options.data);

            $('#new-folder-form').ajaxForm({
               data: data,
               success: $.proxy(function(data){
                    this.refresh(p);
                    $('#new-folder-dialog').modal('hide');
                    console.log(data);
               }, this)
            });
        },

        expand: function(a) {

            /*
                [{"thumbnail":"false",
                  "base64":"false",
                  "type":"file",
                  "path":".gitignore",
                  "label":".gitignore"}]
            */
            var path = a.attr('href').substr(1);
            var i = $(a).siblings('.toggler').children('i');

            if($.inArray(path, this._caches.loaded) === -1) {

                var data = DTFINDER.File.list(path);
                //save data
                this._caches.data[path] = data;

                this._caches.loaded.push(path);
            }

            var ul = this.buildList(this._caches.data[path]);

            $(a).siblings('ul').remove(); // remove esixting
            $(ul).hide(); // hide first to slide
            $(a).after(ul);

            i.removeClass(this.options.classes.collapse);
            i.addClass(this.options.classes.expand);
            $(a).siblings('ul').slideDown('fast');
        },

        collapse: function(a) {

            var i = $(a).siblings('.toggler').children('i');

            i.removeClass(this.options.classes.expand);
            i.addClass(this.options.classes.collapse);

            $(a).siblings('ul').slideUp('fast');            
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
                        console.log(res);
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
                    
                    var tree = this.buildList([{
                        path: '/',
                        label: '/',
                        type: 'dir'
                    }]);
                    
                    $('#sub-browser-dialog').on('shown.bs.modal', function (e) {
                        $(this).find('.modal-body').html(tree);
                        $(this).find('.modal-body').append('<div><button class="btn btn-sm btn-primary folder-selector">Select</button></div>');
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
                        path = this._caches.currentPath;
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
            ul = DTFINDER.DOM.create('UL');

            for(i=0; i<data.length; i++ ) {
                    
                var node = DTFINDER.DOM.createFileItem(data[i]);
                $(ul).append(node);
            }

            $(this.browserArea).html(ul)
        },

        refresh: function(path) {

            if(typeof path == 'undefined') {
                path = this._caches.currentPath;
            }

            data = DTFINDER.File.list('/'+path);
            this._caches.data[path] = data;
            this.updateBrowser(data);

            //remove path from loaded
            
            for(var i = this._caches.loaded.length-1; i--;){
                if (this._caches.loaded[i].trim() == path.trim() ) this._caches.loaded.splice(i, 1);
            }

            this._caches.loaded = [];
            
            var a = $('a[href="'+path+'"]');

            a.siblings('ul').remove();

            if(a.children('i').hasClass(this.options.classes.expand)) {
                a.click();
                a.click();
            }
        },

        buildList: function (data){
            
            if(data.length > 0) {
                var ul =  DTFINDER.DOM.create('UL');
                
                for(i=0; i<data.length; i++ ) {
                    
                    if(data[i].type === 'dir') {
                        var node = DTFINDER.DOM.createNode(data[i].path, data[i].label);
                        $(ul).append(node);
                    }
                }
                return ul;
            }

            return null;

        },

        /*
         * Create browser elements, called in init
         */
        createElements: function(el, options) {

            this.nav = DTFINDER.DOM.create('DIV').addClass('dtf-nav ctn');

            this.browserArea = DTFINDER.DOM.create('DIV').addClass('dtf-area ctn dtf-context-holder');

            $(this.browserArea).data('context-target', '#bro-context-menu');

            var row = DTFINDER.DOM.create('DIV').addClass('row');

            var wrapper = DTFINDER.DOM.create('DIV').addClass('wrapper container-fluid');

            var toolBar = DTFINDER.DOM.createToolbar();

            var uploadUrl = this.options.uploadUrl || this.options.url;
            var uploadDialog = DTFINDER.DOM.createUploadDialog(uploadUrl);

            var createFolderUrl = this.options.createFolderUrl || this.options.url;
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

    // A really lightweight plugin wrapper around the constructor,
    // preventing against multiple instantiations
    $.fn[pluginName] = function ( options ) {
        return this.each(function () {
            if (!$.data(this, "plugin_" + pluginName)) {
                $.data(this, "plugin_" + pluginName,
                new Plugin( this, options ));
            }
        });
    };

})(jQuery, window, document, DTFINDER);