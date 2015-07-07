DTFINDER.DOM = {


    _render: function(templateString, param) {
        var template = Handlebars.compile(templateString, param)
        return template(param);
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

        var content = this._render(DTFINDER.Template.uploadForm(), {uploadUrl:uploadUrl});
        return this.createModal('upload-dialog', content);
    },

    createNewFolderDialog: function(createFolderUrl){

        var param = { createFolderUrl: createFolderUrl }

        var content = this._render(DTFINDER.Template.newFolder(), param);

        return this.createModal('new-folder-dialog', content, 'modal-sm');
    },

    createSubBrowserDialog: function(){

        var content = this._render(DTFINDER.Template.moveBrowser());
        return this.createModal('sub-browser-dialog', content, 'modal-sm');
    },

    createPropertiesDialog: function(){
        return this.createModal('properties-dialog', '', 'modal-sm');
    },

    createModal: function(id, content, size) {

        var size = size || '';
        return this._render(DTFINDER.Template.modal(), {id:id, content:content, size: size});
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

        var li = this.create('LI').addClass('dtf-item dtf-context-holder');
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

        var mobileContextMenu = this._render(DTFINDER.Template.mobileContextMenu(), {path: file.path});
        $(li)
            .append(a)
            .append(mobileContextMenu);

        return li;
    }
}
