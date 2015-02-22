FINDER = {};
FINDER.config = {};
FINDER.config.data = {};
FINDER.config.classes = {};
FINDER.config.permissions = {};
FINDER._caches = [];

FINDER.Element = {

    // Create element
    create: function(name, attr) {
        el = document.createElement(name);

        if(typeof attr != 'undefined') {
            $.each( attr, function( key, value ) {
                $(el).attr(key, value);
            });
        }

        return $(el);
    },

    createToolbar: function(){
        toolBar = this.create('DIV').addClass('row toolBar');
        
        /*
        settingBtn = this.createEl('A')
            .addClass('tool btn btn-sm btn-default pull-right')
            .html('<i class="fa fa-gears"></i>');

        listBtn =  this.createEl('A')
            .addClass('tool btn btn-sm btn-default pull-right')
            .html('<i class="fa fa-list"></i>');

        gridBtn = this.createEl('A')
            .addClass('tool btn btn-sm btn-default pull-right')
            .html('<i class="fa fa-th"></i>');
            */

        if(FINDER.config.permissions.create) {
            uploadBtn =  this.create('A', {
                    href: '#',
                    'data-toggle': 'modal',
                    'data-target': '#upload-dialog'
                }).addClass('upload-btn tool btn btn-sm btn-success pull-left')
                .html('<i class="fa fa-upload"></i> Upload');
            
            $(toolBar).append(uploadBtn);
        }

        /*searchForm = this.createEl('FORM').addClass('form-inline');
        searchInput = this.createEl('INPUT', {
            type: 'text',
            name: 'q',
            placeholder: 'Type to search'
        }).addClass('tool input-sm form-control pull-right')
        
        $(searchForm).append(searchInput);*/

            $(toolBar)
                //.append(searchForm)


        return toolBar;
    },

    createUploadDialog: function(uploadUrl){
        
        var html =[
            '<form method="POST" enctype="multipart/form-data" class="form clearfix" id="upload-form" action="'+uploadUrl+'">',
            '<input multiple type="file" name="files[]" style="margin-bottom:10px;">',
            '<div class="uploaded"></div>',
            '<input type="submit" class="btn btn-primary btn-sm pull-right" value="Submit">',
            '<a href="javascript:;" class="btn btn-default btn-sm pull-right" data-dismiss="modal" style="margin-right:10px;">Cancel</a>',
            '</form>'].join('');

        return this.createModal('upload-dialog', html);
    },

    createNewFolderDialog: function(createFolderUrl){

        var html =[
            '<form method="GET" class="form clearfix" id="new-folder-form" action="'+createFolderUrl+'">',
            '<label class="control-label">Folder Name</label>',
            '<input type="text" name="folder-name" value="New Folder" class="form-control new-folder-input" style="margin-bottom:10px;"/>',
            '<input type="submit" class="btn btn-sm btn-primary pull-right" value="Submit"/>',
            '<a href="#" style="margin-right:10px;" class="btn btn-sm btn-default pull-right" data-dismiss="modal">Cancel</a>',
            '</form>'].join('');

        return this.createModal('new-folder-dialog', html, 'modal-sm');
    },

    createSubBrowserDialog: function(){
        var html = '';
        return this.createModal('sub-browser-dialog', html, 'modal-sm');
    },

    createPropertiesDialog: function(){
        var html = '';
        return this.createModal('properties-dialog', html, 'modal-sm');
    },

    createModal: function(id, html, size) {

        var size = size || '';

        var modal = this.create('DIV', {
            id: id
        }).addClass('modal');
        
        var body = this.create('DIV').addClass('modal-body');

        var dialog = this.create('DIV').addClass('modal-dialog '+ size);
        var content = this.create('DIV').addClass('modal-content');

        $(body).html(html);
        $(content).append(body);
        $(dialog).append(content);
        $(modal).append(dialog);

        return modal;
    },

    createBrowserContext: function() {
        
        var context = {};

        if(FINDER.config.permissions.create) {
            context['new-folder'] = 'New Folder\u2026'
        }

        context.properties = 'Properties';
        return this.createContextMenu('bro-context-menu', context);
    },

    // right click context menu
    createItemContext: function() {
        
        var context = {};
 
        if(FINDER.config.permissions.move) {
            context.rename = 'Rename',
            context.move = 'Move\u2026'
        }

        if(FINDER.config.permissions.delete) {
            context.delete = 'Delete\u2026'
        }

        context.properties = 'Properties';
        return this.createContextMenu('item-context-menu', context);
    },

    createContextMenu: function(id, menu){

        var dropUL = this.create('UL', {role: 'menu'}).addClass('dropdown-menu');

        $.each(menu, $.proxy(function(key, value) {
            li = this.createContextAction(key, value);
            $(dropUL).append(li);
        }, this));

        var contextWrapper = this.create('DIV', {
            id: id
        }).append(dropUL);

        return contextWrapper;
    },

    // context action
    createContextAction: function(act, text) {
        a = this.create('A', {href: '#'}).text(text);
        li = this.create('LI', {'data-action': act}).append(a);

        return li;
    },

    createNode: function(path, label) {

        var toggler = this.create('I').addClass(FINDER.config.classes.collapse);

        path = path === '/' ? '' : path;
        
        var a = this.create('A', {href: '#/'+path})
            .addClass('of-node')
            .append(' '+label);
        
        var aToggler = this.create('A', {href: '#'})
            .addClass('toggler')
            .append(toggler);

        var li = this.create('LI')
            .append(aToggler)
            .append(a);

        return li;
    },

    createFileItem: function(file) {
        
        var li = this.create('LI').addClass('of-item of-context-holder');
        li.data('context-target', '#item-context-menu');

        if(file.type == 'image') {
             var icon = this.create('IMG',{
                src: file.base64
             })
                .addClass('icon')

            $(li).addClass('img-item');

        } else {

            if(file.type == 'file') {
                faClass = 'fa fa-file-o';
                $(li).addClass('file-item');
            
            } else if(file.type == 'dir') {
                faClass = 'fa fa-folder-o';

                $(li).addClass('folder-item');
            } else {
                faClass = null;
            }

            var icon = this.create('I')
                .addClass('icon')
                .addClass(faClass);
        }

        var a = this.create('A', {href: file.path})
            .append(icon)
            .append('<div style="overflow: hidden;text-overflow: ellipsis;" class="file-name">'+file.label+'</div>');

        $(li).append(a);

        return li;
    }
};FINDER.File = {

    url: null,
    data: {},

    list: function(path){
        var data = $.extend({op: 'ls', path: path }, this.data);

        $.ajax({
            url: this.url,
            data: data,
            async: false
        }).done(function(res){
            FINDER._caches['result'] = res;
        });

        return FINDER._caches['result'];
    },

    move: function(path, dest){
        
        var data = $.extend({
            op: 'move',
            path:path,
            dest: dest
        }, this.data);

        var parent = this;

        $.ajax({
            url: this.url,
            type:'POST',
            data:data,
            async: false,
        });
    },

    rename: function(path, newName){

        var data = $.extend({
            op: 'rename',
            path:path,
            newName: newName
        }, this.data);

        $.ajax({
            url: this.url,
            type:'POST',
            data:data,
            async: false,
        });
    },

    delete: function(path){
        var data = $.extend({op: 'delete', path: path }, this.data);
        var r;

        $.ajax({
            url: this.url,
            data: data,
            async: false
        }).done(function(res){
            r = res;
        });

        return r;
    },

    properties: function(path) {
        var data = $.extend({op: 'properties', path: path }, this.data);
        var r;
        $.ajax({
            url: this.url,
            data: data,
            async: false
        }).done(function(res){
            r = res;
        });

        return r;
    },
};/*!
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

                case 'properties':

                    // if no path, we just well use current path
                    if(!path) {
                        path = this._caches.currentPath;
                    }

                    var file = FINDER.File.properties(path);

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
            var propertiesDialog = FINDER.Element.createPropertiesDialog();

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
                .after(subBrowserDialog)
                .after(propertiesDialog);

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