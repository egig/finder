DTFINDER.File = {

    url: null,
    data: {},

    list: function(path){
        var data = {op: 'ls', path: path }
        return this._sendRequest('GET', data, true)
    },

    move: function(path, dest) {

        var data = {
            op: 'move',
            path:path,
            dest: dest
        }
        return this._sendRequest('POST', data)
    },

    rename: function(path, newName){

        var data = {
            op: 'rename',
            path:path,
            newName: newName
        }

        return this._sendRequest('POST', data)
    },

    delete: function(path){
        var data = {op: 'delete', path: path }
        return this._sendRequest('POST', data, true)
    },

    properties: function(path) {
        var data = {op: 'properties', path: path }
        return this._sendRequest('GET', data, true)
    },

    search: function(q, path) {
        var data = {op: 'search', path: path, q:q}
        return this._sendRequest('GET', data, true)
    },

    _sendRequest: function(type, data, ret) {

        data = $.extend(data, this.data);

        var ajax = $.ajax({
            url: this.url,
            data: data,
            type: type,
            async: false
        })

        if(typeof ret !== 'undefined' && ret === true) {
            var r;
            ajax.done(function(res){
                r = res;
            });

            return r;
        }
    }
}