var port = 3002;

var express = require('express')
var path = require('path')
var fs = require('fs')
var app = express()

var base_path = path.join(__dirname, 'files');

var Server = {
    handle: function(request, response) {

        var op = request.query.op;
        var q_path = request.query.path;

        switch (op) {
            case 'ls':
                var json_response = this.ls(q_path);
                break;
            default:
                var json_response = {error: "Unknown op"};
                break;
        }

        response.json(json_response);
    },

    ls: function(q_path) {

        var reqx_path = prepare_path(q_path);

        var data = fs.readdirSync(reqx_path);

        var array_data = [];
        for(var i=0;i<data.length;i++) {

            var full_path = path.join(base_path, data[i]);
            var p = make_relative_path(full_path, base_path);
            var p_stat = fs.lstatSync(full_path);

            var file = {
                type: p_stat.isFile() ? "file" : "dir",
                path: path.join(q_path, p),
                text: data[i],
            }

            array_data.push(file);
        }

        return array_data;
    }
}

function prepare_path(q_path) {
    return path.join(base_path, q_path);
}

function make_relative_path(path, base) {
    return path.replace(base, "");
}

// setting up
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

app.all("/files", function(request, response) {
    Server.handle(request, response);
});

app.listen(port);
console.log("Running server on port "+port);
