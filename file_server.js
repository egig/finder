var port = 3002;

var express = require('express')
var app = express();

var Server = {
    handle: function(request, response) {
            var name = request.query.op;
        response.json([{"thumbnail":false,"base64":false,"type":"dir","path":"#\/New Folder","text":"New Folder","nodes":[]}])   ;
    }
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
