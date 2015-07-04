DTFINDER.Template = function(){

    var _ = function(str) {
        return DTFINDER.Locale.localize(str);
    }

    return {

        breadcrumb: function(){
                return ''
                +'<div class="">'
                    +'<div class="col-md-12">'
                        +'<a id="dtf-parent-folder" href="#">'
                            +'<span class="fa-stack fa-lg"> <i class="fa fa-folder-o fa-stack-1x"></i> <i class="fa fa-mail-reply"></i> </span>'
                        +'</a>'
                        +'<span id="dtf-breadcrumb"></span>'
                    +'</div>'
                +'</div>';
        },

        toolbar: function() {
            return '<div class="dtf-toolbar" style="margin-bottom:5px">'
                    +'<div class="toolbar clearfix col-md-6">'
                        +'<a href="#" data-toggle="modal" data-target="#upload-dialog" class="upload-btn tool btn btn-sm btn-success pull-left"><i class="fa fa-upload"></i> Unggah</a>'
                    + '</div>'
                    +'<div class="toolbar clearfix col-md-6">'
                        +'<form class="form-inline"><input type="text" name="q" placeholder="Cari" class="input-sm form-control pull-right dt-search-input">'
                        +'</form>'
                    + '</div>'
                +'</div>'
        },

        modal: function() {
            return '<div id="{{ id }}" class="modal in">'
                +'<div class="modal-dialog {{ size }}">'
                    +'<div class="modal-content">'
                        +'<div class="clearfix">'
                            +'<button style="margin:5px 15px;" aria-label="Close" data-dismiss="modal" class="close" type="button"><span aria-hidden="true">×</span></button>'
                        +'</div>'
                        +'<div class="modal-body">{{{ content }}} </div>'
                    +'</div>'
                +'</div>'
            +'</div>'
        },

        newFolder: function(){

            return '<form method="GET" class="form clearfix" id="new-folder-form" action="{{ createFolderUrl }}">'
                + '<label class="control-label">'+_('New Folder')+'</label>'
                + '<input type="text" name="folder-name" value="New Folder" class="form-control new-folder-input" style="margin-bottom:10px;"/>'
                + '<input type="submit" class="btn btn-sm btn-primary pull-right" value="'+_('Submit')+'"/>'
                + '<a href="javascript:;" class="btn btn-default btn-sm pull-right" data-dismiss="modal" style="margin-right:10px;">'+_('Cancel')+'</a>'
            + '</form>'
        },

        uploadForm: function(){

            return '<form method="POST" enctype="multipart/form-data" class="form clearfix" id="upload-form" action="{{ uploadUrl }}">'
                + '<input multiple type="file" name="files[]" style="margin-bottom:10px;">'
                + '<div class="uploaded"></div>'
                + '<input type="submit" class="btn btn-primary btn-sm pull-right" value="'+_('Submit')+'">'
            + '</form>'
        },

        moveBrowser: function() {
            return '<div><button class="btn btn-xs pull-right btn-primary folder-selector">'+_('Select')+'</button></div>'
        },

        mobileContextMenu: function(){
            return ''
                +'<span class="mobile-context-menu pull-right dropdown"><a data-toggle="dropdown" href="#" style="font-size:1.4em"><i class="fa fa-angle-down"></i></a>'
                + '<ul class="dropdown-menu" aria-labelledby="dropdownMenu1">'
                +'<li><a href="#">'+_('Rename')+'</a></li>'
                +'<li><a href="#">'+_('Move')+'</a></li>'
                +'<li><a href="#">'+_('Delete')+'</a></li>'
                +'<li><a href="#">'+_('Properties')+'</a></li>'
                +'</ul></span>'
        }

    }
}();
