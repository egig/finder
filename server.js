var port = 3002;

var express = require('express')
var path = require('path')
var fs = require('fs')
var app = express()
var bodyParser = require('body-parser')
var rimraf = require('rimraf')
var multer = require('multer')
var multer  = require('multer')
var upload = multer({ dest: 'files/' })

var base_path = path.join(__dirname, 'files');

var Server = {

    handleUpload: function(request, response) {

        var q_path = request.body.path;
        var reqx_path = prepare_path(q_path);

        var json_response = [];
        for(var i=0; i<request.files.length; i++) {

            var tmp_path = request.files[i].path;

            // The original name of the uploaded file
            // is stored in the variable "originalname".
            var name = request.files[i].originalname;
            var target_path = reqx_path+'/' + request.files[i].originalname;

            var src = fs.createReadStream(tmp_path);
            var dest = fs.createWriteStream(target_path);
            src.pipe(dest);

            json_response.push({uploaded: name});

            // @todo
            // src.on('end', function() { res.render('complete'); });
            /// src.on('error', function(err) { res.render('error'); });
        }

        response.json(json_response);
    },

    handle: function(request, response) {

        var op = request.query.op;
        var q_path = request.query.path;

        if( typeof op == 'undefined') {
            op = request.body.op;
        }

        switch (op) {
            case 'ls':
                var json_response = this.ls(q_path);
                break;
            case 'properties':
                var json_response = this.properties(q_path);
                break;
            case 'mkdir':
                var folder_name = request.body['folder-name'];
                q_path = request.body.path;
    
                var json_response = this.mkdir(q_path, folder_name);
                break;
            case 'delete':
                q_path = request.body.path;
                var json_response = this.delete(q_path);
                break;
            default:
                var json_response = {error: "Unknown op"};
                break;
        }

        response.json(json_response);
    },

    delete: function(q_path) {
        var reqx_path = prepare_path(q_path);

        rimraf(reqx_path, function(err) { });

        return {};
    },

    mkdir: function(q_path, folder_name) {
        var reqx_path = prepare_path(q_path);
        var full_path = path.join(reqx_path, folder_name);

        fs.mkdir(full_path);

        return {
            type: "dir",
            path: path.join(q_path, folder_name),
        }
    },

    properties: function(q_path) {

        var reqx_path = prepare_path(q_path);
        var p_stat = fs.lstatSync(reqx_path);
        return {
            name: q_path,
            size: p_stat.size,
            type: q_path.isFile ? "File" : "Directory",
            location: path.dirname(reqx_path)
        };
    },

    ls: function(q_path) {

        var reqx_path = prepare_path(q_path);

        var data = fs.readdirSync(reqx_path);

        var array_data = [];
        for(var i=0;i<data.length;i++) {

            var full_path = path.join(reqx_path, data[i]);
            var p = make_relative_path(full_path, reqx_path);
            var p_stat = fs.lstatSync(full_path);

            var file = {
                type: p_stat.isFile() ? "file" : "dir",
                path: path.join(q_path, p),
                text: data[i],
            }

            if(p_stat.isDirectory()) {
                file.nodes = [];
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
    return path.replace(base, "").trimLeft('/');
}

// setting up
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    next();
});

app.get("/files", function(request, response) {
    Server.handle(request, response);
});

app.post("/files", function(request, response) {
    Server.handle(request, response);
});

var uploadType = upload.array('files[]', 10);

app.post('/files/upload', uploadType, function (req, res, next) {
    Server.handleUpload(req, res);
});


app.listen(port);
console.log("Running server on port "+port);
