FINDER.File = {

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
}