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

DT = {};

DT.Element = {

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

        uploadBtn =  this.create('A', {
                href: '#',
                'data-toggle': 'modal',
                'data-target': '#upload-dialog'
            }).addClass('upload-btn tool btn btn-sm btn-success pull-left')
            .html('<i class="fa fa-upload"></i> Upload');

        /*searchForm = this.createEl('FORM').addClass('form-inline');
        searchInput = this.createEl('INPUT', {
            type: 'text',
            name: 'q',
            placeholder: 'Type to search'
        }).addClass('tool input-sm form-control pull-right')
        
        $(searchForm).append(searchInput);*/

        toolBar = this.create('DIV').addClass('row toolBar');

        $(toolBar)
            .append(uploadBtn);
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

    createModal: function(id, html, size) {

        var size = size || '';

        var modal = this.create('DIV', {
            id: id
        }).addClass('modal fade');
        
        var body = this.create('DIV').addClass('modal-body');

        var dialog = this.create('DIV').addClass('modal-dialog '+ size);
        var content = this.create('DIV').addClass('modal-content');

        $(body).html(html);
        $(content).append(body);
        $(dialog).append(content);
        $(modal).append(dialog);

        return modal;
    },

    createBroContext: function() {
        return this.createContextMenu('bro-context-menu', {
            'new-folder': 'New Folder',
        });
    },

    // right click context menu
    createItemContext: function() {
        return this.createContextMenu('item-context-menu', {
            'rename': 'Rename',
            'move': 'Move...',
            'delete': 'Delete...',
            //'copy': 'Copy...',
            //'move': 'Move...',
        });
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

        var icon = this.create('I').addClass('fa fa-folder-o');
        
        var a = this.create('A', {href: path})
            .addClass('of-node')
            .append(icon)
            .append(' '+label);

        var li = this.create('LI').append(a);

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
}

DT._caches = Array();

;(function ($, window, document, DT) {

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
            data: {}
        };

    // The actual plugin constructor
    function Plugin( element, options ) {
        this.element = element;

        // The first object is generally empty because we don't
        // want to alter the default options for future instances
        // of the plugin
        this.options = $.extend( {}, defaults, options);

        this._defaults = defaults;
        this._name = pluginName;

        this.init();
    }

    Plugin.prototype = {

        init: function() {

            this._caches = {};
            this._caches.loaded = [];
            this._caches.data = [];
            
            this.createContainer(this.element, this.options);

            this.listen(this.element, this.options);

            // init data
            // this also make this._caches.currentPath = '/'
            $('a[href="/"].of-node').click();
        },

        listen: function (el, options) {

            $(el).on('click', 'a.of-node', $.proxy(this.toggle, this));
                
            var parent = this;
            $('#sub-browser-dialog').on('click', 'a.of-node', function(e){

                e.preventDefault();
                var a = e.currentTarget;
                var path = $(a).attr('href');

                $('#sub-browser-dialog').find('.selected').removeClass('selected');
                $(a).addClass('selected');

                // load from
                var data = parent.request('ls', '/'+path);
                //save data
                
                ul = parent.buildTree(data);
                $(a).siblings('ul').remove(); // hide first to slide
                $(ul).hide(); // hide first to slide
                $(a).after(ul);                    

                parent.toggleSlides(a);
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

        listenRename: function(){
            var parent = this;
            $(document).on('keyup', '.rename-input', function(e){
                if(e.keyCode == 13 || e.which == 13) {

                    var data = $.extend({
                        op: 'rename',
                        path:$(this).data('path'),
                        newName: $(this).val()
                    }, parent.options.data);

                    $.ajax({
                        url: parent.options.url,
                        type:'POST',
                        data:data,
                        async: false,
                        success: function(res){
                            
                            if(!res.error) {
                               $( e.target).parent()
                                    .siblings('a')
                                    .children('.file-name')
                                    .text(res.newName).show();

                               $( e.target).parent().remove();
                            }

                            parent.refresh();
                        }
                    });
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
                    
                    if(data.status == 'error') {
                            data.status = 'danger';
                    }
                    $.notify(data.message, data.status);
               }, this)
            });
        },

        toggle: function(e) {

            e.preventDefault();
            var a = e.currentTarget;
            var path = $(a).attr('href');

            // load from
            if($.inArray(path, this._caches.loaded) === -1) {

                var data = this.request('ls', '/'+path);
                //save data
                this._caches.data[path] = data;
                
                ul = this.buildTree(data);
                $(a).siblings('ul').remove(); // remove esixting
                $(ul).hide(); // hide first to slide
                $(a).after(ul);
                
                this._caches.loaded.push(path);
            }

            this._caches.currentPath = path;
            
            //upload
            this.listenUpload(path);
            this.listenCreateFolder(path);

            this.toggleSlides(a);
            this.updateBrowser(this._caches.data[path]);
            this.handleHight();
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
                        var res = this.request('delete', path);
                        this.refresh();
                        if(res.status == 'error') {
                            res.status = 'danger';
                        }
                        $.notify(res.message, res.status);

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
                    
                    var tree = this.buildTree([{
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
                        var href = $('#sub-browser-dialog').find('.selected').attr('href');

                        parent.move(path, href);
                        $('#sub-browser-dialog').modal('hide');
                    });

                    $('#sub-browser-dialog').modal('show');

                break;
                default:
                break;
            }
        },

        move: function(path, dest){
            var data = $.extend({
                op: 'move',
                path:path,
                dest: dest
            }, this.options.data);

            var parent = this;

            $.ajax({
                url: this.options.url,
                type:'POST',
                data:data,
                async: false,
                success: function(res){
                    parent.refresh();
                }
            });            
        },

        updateBrowser: function (data){
            ul = DT.Element.create('UL');

            for(i=0; i<data.length; i++ ) {
                    
                node = DT.Element.createFileItem(data[i]);
                $(ul).append(node);
            }

            $(this.browserArea).html(ul)
        },

        toggleSlides: function(a){
            i = $(a).children('i');
            path = $(a).attr('href');
            
            if(i.hasClass('fa-folder-open-o')) {
                i.removeClass('fa-folder-open-o');
                i.addClass('fa-folder-o');

                $(a).siblings('ul').slideUp('fast');
            } else {

                i.removeClass('fa-folder-o');
                i.addClass('fa-folder-open-o');
                $(a).siblings('ul').slideDown('fast');                
            }
        },

        request: function(op, path) {

            var data = $.extend({op: op, path: path }, this.options.data);

            $.ajax({
                url: this.options.url,
                data: data,
                async: false
            }).done(function(res){
                DT._caches['result'] = res;
            });

            return DT._caches['result'];
        },

        refresh: function(path) {

            if(typeof path == 'undefined') {
                path = this._caches.currentPath;
            }

            data = this.request('ls', '/'+path);
            this._caches.data[path] = data;
            this.updateBrowser(data);

            //remove path from loaded
            
            for(var i = this._caches.loaded.length-1; i--;){
                if (this._caches.loaded[i].trim() == path.trim() ) this._caches.loaded.splice(i, 1);
            }

            this._caches.loaded = [];
            
            var a = $('a[href="'+path+'"]');

            a.siblings('ul').remove();

            if(a.children('i').hasClass('fa-folder-open-o')) {
                a.click();
                a.click();
            }
        },

        buildTree: function (data){
            
            if(data.length > 0) {
                var ul =  DT.Element.create('UL');
                
                for(i=0; i<data.length; i++ ) {
                    
                    if(data[i].type === 'dir') {
                        var node = DT.Element.createNode(data[i].path, data[i].label);
                        $(ul).append(node);
                    }
                }
                return ul;
            }

            return null;

        },

        createContainer: function(el, options) {

            var nav = DT.Element.create('DIV').addClass('ctn-nav ctn');
            
            this.browserArea = DT.Element.create('DIV').addClass('ctn-bro ctn of-context-holder');

            $(this.browserArea).data('context-target', '#bro-context-menu');
            
            var row = DT.Element.create('DIV').addClass('row');

            var wrapper = DT.Element.create('DIV').addClass('wrapper container-fluid');

            var toolBar = DT.Element.createToolbar();
            
            var uploadUrl = this.options.uploadUrl || this.options.url;
            var uploadDialog = DT.Element.createUploadDialog(uploadUrl);

            var createFolderUrl = this.options.createFolderUrl || this.options.url;
            var newFolderDialog = DT.Element.createNewFolderDialog(createFolderUrl);
            var subBrowserDialog = DT.Element.createSubBrowserDialog();

            var itemContext = DT.Element.createItemContext();
            var broContext = DT.Element.createBroContext();

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

            var roots = this.buildTree([{
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

})(jQuery, window, document, DT);