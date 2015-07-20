DTFINDER.DOM = {

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
        return this._render('file-item.html', {file:file});
    }
}
