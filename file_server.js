module.exports = function(base_path) {

    var fs = require('fs-extra');
    var path = require('path');
    var rimraf = require('rimraf')

    function prepare_path(q_path) {
        return path.join(base_path, q_path);
    }

    function make_relative_path(path, base) {
        return path.replace(base, "").trimLeft('/');
    }

    return {

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
                case 'rename':
                    q_path = request.body.path;
                    new_name = request.body.newName;
                    var json_response = this.rename(q_path, new_name);
                    break;
                case 'copy':
                    q_path = request.body.path;
                    var dest = request.body.dest;

                    var json_response = this.copy(q_path, dest);

                    break;
                 case 'cut':
                    q_path = request.body.path;
                    var dest = request.body.dest;

                    var json_response = this.cut(q_path, dest);

                    break;
                default:
                    var json_response = {error: "Unknown op"};
                    break;
            }

            response.json(json_response);
        },

        copy: function(q_path, dest) {
            var reqx_path = prepare_path(q_path);
            var req_dest = prepare_path(dest);

            var p_stat = fs.lstatSync(req_dest);
            if(p_stat.isFile()) {
                console.log("Cannot override file");
                return false;
            }

            var bname = path.basename(reqx_path);
            if(p_stat.isDirectory()) {
                req_dest = path.join(req_dest, bname);
            }

            fs.copy(reqx_path, req_dest, function(err) {
                if(err) console.log(err);
            });

            return [];
        },

        cut: function(q_path, dest) {
            var reqx_path = prepare_path(q_path);
            var req_dest = prepare_path(dest);

            var p_stat = fs.lstatSync(req_dest);
            if(p_stat.isFile()) {
                console.log("Cannot override file");
                return false;
            }

            var bname = path.basename(reqx_path);
            if(p_stat.isDirectory()) {
                req_dest = path.join(req_dest, bname);
            }

            fs.move(reqx_path, req_dest, function(err) {
                if(err) console.log(err);
            });

            return [];
        },

        rename: function(q_path, new_name) {

            var reqx_path = prepare_path(q_path);

            var dirname = path.dirname(reqx_path);

            var new_path = path.join(dirname, new_name);

            fs.rename(reqx_path, new_path);

            return [];
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

};
