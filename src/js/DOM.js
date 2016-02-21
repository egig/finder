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

    createUploadDialog: function(uploadUrl){

        var content = this._render('upload-form.html', {
            uploadUrl:uploadUrl,
            Submit: DTFINDER.Locale.localize("Submit")
        });
        return this.createModal('dtf-upload-dialog', content);
    },

    createNewFolderDialog: function(createFolderUrl){

        var param = {
            createFolderUrl: createFolderUrl,
            Submit: DTFINDER.Locale.localize("Submit"),
            Cancel: DTFINDER.Locale.localize("Cancel")
        }

        var content = this._render('new-folder-form.html', param);

        return this.createModal('dtf-new-folder-dialog', content, 'modal-sm');
    },

    createSubBrowserDialog: function(){

        var param = {
            selectLabel: DTFINDER.Locale.localize('Select')
        }
        var content = this._render('sub-browser.html', param);
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

        var context = [];

        if(DTFINDER.config.permissions.create) {
            context.push({action: "new-folder", text: DTFINDER.Locale.localize('New Folder')+'\u2026'});
        }

        context.push({action: "properties", text:DTFINDER.Locale.localize('Properties')});

        return this._render('context-menu.html', {id:"bro-context-menu",  menus: context});
    },

    // right click context menu
    createItemContext: function() {

        var context = [];

        if(DTFINDER.config.permissions.move) {
            context.push({action: "rename", text: DTFINDER.Locale.localize('Rename')});
            context.push({action: "move", text: DTFINDER.Locale.localize('Move')+'\u2026'});
        }

        if(DTFINDER.config.permissions.delete) {
            context.push({action: "delete", text: DTFINDER.Locale.localize('Delete')+'\u2026'});
        }

        context.push({action: "properties", text: DTFINDER.Locale.localize('Properties')});

        return this._render('context-menu.html', {id:"item-context-menu",  menus: context});
    },

    createFileItem: function(file) {
        return this._render('file-item.html', {file:file});
    }
}
