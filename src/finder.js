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

;(function ($, window, document, FINDER) {

    // Create the defaults
    var pluginName = "finder",
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

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        // The first object is generally empty because we don't
        // want to alter the default options for future instances
        // of the plugin
        this.options = FINDER.config = $.extend( {}, defaults, options);
        this.options.data = FINDER.config.data = $.extend( {}, defaults.data, options.data);
        this.options.classes = FINDER.config.classes = $.extend( {}, defaults.classes, options.classes);
        this.options.permissions = FINDER.config.permissions = $.extend( {}, defaults.permissions, options.permissions);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {

        init: function() {

            this._caches = {};
            this._caches.loaded = [];
            this._caches.data = [];
            
            FINDER.File.url = this.options.url;
            FINDER.File.data = this.options.data;

            this.createContainer(this.element, this.options);

            var path = window.location.hash.substr(1);
            this.listen(this.element, this.options);

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

            $(el).on('click', 'a.toggler', function(e){
                e.preventDefault();

                var a = $(this).siblings('.of-node');
                
                if($(this).children('i').hasClass(parent.options.classes.expand)) {
                    parent.collapse(a);
                } else {
                    parent.expand(a);
                }

                parent.handleHight();
            });
            
            window.onpopstate = function(e){
                var path = window.location.hash.substr(1);
                parent.open(path);
            };

            $('#sub-browser-dialog').on('click', 'a.toggler', function(e){
                e.preventDefault();

                var a = $(this).siblings('.of-node');
                
                if($(this).children('i').hasClass(parent.options.classes.expand)) {
                    parent.collapse(a);
                } else {
                    parent.expand(a);
                }
            });

            $('#sub-browser-dialog').on('click', 'a.of-node', function(e){
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

            // item click
            $(el).on('click', '.of-item a', function(e){
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

                var data = FINDER.File.list(path);
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

        listenRename: function(){
            var parent = this;
            $(document).on('keyup', '.rename-input', function(e){
                if(e.keyCode == 13 || e.which == 13) {

                    var path = $(this).data('path');
                    var newName = $(this).val();

                    FINDER.File.rename(path, newName);

                   $( e.target).parent()
                        .siblings('a')
                        .children('.file-name')
                        .text(newName).show();

                   $( e.target).parent().remove();

                    parent.refresh();
                }
            });
        },

        listenContextMenu: function (el){
             $(el).contextmenu({
              onItem: $.proxy(this.handleContext, this),
              before: function (e, element, target) {

                    var contextTarget = null;

                    if($(e.target).hasClass('of-context-holder')) {

                        $(el).data('context-holder', e.target);
                        contextTarget = $(e.target).data('context-target');
                    } else {
                                        
                        var containers = $(e.target).parents();
                        
                        $.each(containers, function(key, value){
                            if($(value).hasClass('of-context-holder')) {

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

            // load from
            var path = a.attr('href').substr(1);
            var i = $(a).siblings('.toggler').children('i');

            if($.inArray(path, this._caches.loaded) === -1) {

                var data = FINDER.File.list(path);
                //save data
                this._caches.data[path] = data;

                this._caches.loaded.push(path);
            }

            ul = this.buildList(this._caches.data[path]);

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
            var h = $('.ctn-bro').height();
            $('.ctn-nav').height(h);
        },

        handleContext: function(context, e) {

            e.preventDefault();

            var op = $(e.target).parent().data('action');

            var holder = $(context).data('context-holder');

            var path = $(holder).children('a').attr('href');

            switch(op) {
                case 'delete':

                    if(confirm('Are you sure you want to delete '+path+' ?, this cannot be undone.')) {
                        var res = FINDER.File.delete(path);
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
                    
                    $(holder).append('<div><input data-path="'+path+'" type="text" style="height:24px;" class="form-control input-sm rename-input" value="'+file+'"></div>');
                    $(holder).find('.rename-input').select();
                    
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

                        FINDER.File.move(path, href);
                        parent.refresh();

                        $('#sub-browser-dialog').modal('hide');
                    });

                    $('#sub-browser-dialog').modal('show');

                break;
                default:
                break;
            }
        },

        updateBrowser: function (data){
            ul = FINDER.Element.create('UL');

            for(i=0; i<data.length; i++ ) {
                    
                node = FINDER.Element.createFileItem(data[i]);
                $(ul).append(node);
            }

            $(this.browserArea).html(ul)
        },

        refresh: function(path) {

            if(typeof path == 'undefined') {
                path = this._caches.currentPath;
            }

            data = FINDER.File.list('/'+path);
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
                var ul =  FINDER.Element.create('UL');
                
                for(i=0; i<data.length; i++ ) {
                    
                    if(data[i].type === 'dir') {
                        var node = FINDER.Element.createNode(data[i].path, data[i].label);
                        $(ul).append(node);
                    }
                }
                return ul;
            }

            return null;

        },

        createContainer: function(el, options) {

            var nav = FINDER.Element.create('DIV').addClass('ctn-nav ctn');
            
            this.browserArea = FINDER.Element.create('DIV').addClass('ctn-bro ctn of-context-holder');

            $(this.browserArea).data('context-target', '#bro-context-menu');
            
            var row = FINDER.Element.create('DIV').addClass('row');

            var wrapper = FINDER.Element.create('DIV').addClass('wrapper container-fluid');

            var toolBar = FINDER.Element.createToolbar();
            
            var uploadUrl = this.options.uploadUrl || this.options.url;
            var uploadDialog = FINDER.Element.createUploadDialog(uploadUrl);

            var createFolderUrl = this.options.createFolderUrl || this.options.url;
            var newFolderDialog = FINDER.Element.createNewFolderDialog(createFolderUrl);
            var subBrowserDialog = FINDER.Element.createSubBrowserDialog();

            var itemContext = FINDER.Element.createItemContext();
            var broContext = FINDER.Element.createBrowserContext();

            $(row)
                .append(nav)
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
                .after(subBrowserDialog);

            var roots = this.buildList([{
                path: '/',
                label: '/',
                type: 'dir'
            }]);

            nav.append(roots);
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

})(jQuery, window, document, FINDER);