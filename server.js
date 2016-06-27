 var port = 3002;

var express = require('express')
var path = require('path')
var fs = require('fs-extra')
var app = express()
var bodyParser = require('body-parser')
var multer = require('multer')
var upload = multer({ dest: 'files/' })

var base_path = path.join(__dirname, 'files');

var Server = require("./file_server.js")(base_path);

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
