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

        searchForm = this.create('FORM').addClass('form-inline');
        searchInput = this.create('INPUT', {
            type: 'text',
            name: 'q',
            placeholder: 'Type to search'
        }).addClass('input-sm form-control pull-right dt-search-input')

        $(searchForm).append(searchInput);

        $(toolBar).append(searchForm)


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
}