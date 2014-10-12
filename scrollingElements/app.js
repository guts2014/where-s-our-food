/*
var multiparty = require('multiparty');
var http = require('http');
var io = require('socket.io')(app);
var fs = require('fs');
var port = 8080;

var whatToFind = 'drumVote';

function getMelody(emailBody){
    var regex = /([0-8]){8}/;
    var melody = emailBody.match(regex);
    return melody[0];
}

function getDrumVote(emailBody){
    var drumVoteStr = emailBody;
    drumVoteStr = JSON.parse(drumVoteStr)[0].trim().substr(0,1);
    if(drumVoteStr == "a" || drumVoteStr == "A"){
        return 0;
    } else if(drumVoteStr == "b" || drumVoteStr == "B"){
        return 1;
    } else if(drumVoteStr == "c" || drumVoteStr == "C"){
        return 2;
    } else if(drumVoteStr == "d" || drumVoteStr == "D"){
        return 3;
    } else {
        return drumVoteStr;
    }
}

var app = http.createServer(function(req, res) {

    if (req.method === 'POST') {

        console.log("POST received");

        // parse a file upload
        var form = new multiparty.Form();

        form.parse(req, function(err, fields, files) {
            // See https://sendgrid.com/docs/API_Reference/Webhooks/parse.html for fields
            var who = JSON.stringify(fields.from);
            who = who.substr(2, who.indexOf("<") - 3);

            var bodyText = JSON.stringify(fields.text);
            bodyText = getDrumVote(bodyText);

            console.log(who);
            console.log(bodyText);

        });

        return;
    }
}).listen(port);

console.log('Listening on port %d', port);

*/

/*
var multiparty = require('multiparty'),
    io = require('socket.io').listen(app),
    http = require("http"),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    port = 3000;

function getMelody(emailBody){
    var regex = /([0-8]){8}/;
    var melody = emailBody.match(regex);
    return melody[0];
}

function getDrumVote(emailBody){
    var drumVoteStr = emailBody;
    drumVoteStr = JSON.parse(drumVoteStr)[0].trim().substr(0,1);
    if(drumVoteStr == "a" || drumVoteStr == "A"){
        return 0;
    } else if(drumVoteStr == "b" || drumVoteStr == "B"){
        return 1;
    } else if(drumVoteStr == "c" || drumVoteStr == "C"){
        return 2;
    } else if(drumVoteStr == "d" || drumVoteStr == "D"){
        return 3;
    } else {
        return drumVoteStr;
    }
}

var app = http.createServer(function(request, response) {

    if (request.method === 'POST') {

        console.log("POST received");

        // parse a file upload
        var form = new multiparty.Form();

        form.parse(request, function(err, fields, files) {
            // See https://sendgrid.com/docs/API_Reference/Webhooks/parse.html for fields
            var who = JSON.stringify(fields.from);
            who = who.substr(2, who.indexOf("<") - 3);

            var bodyText = JSON.stringify(fields.text);
            bodyText = getDrumVote(bodyText);

            console.log(who);
            console.log(bodyText);

        });

        return;
    }

    console.log(request.url);

    var uri = url.parse(request.url).pathname
        , filename = path.join(process.cwd(), uri);

    path.exists(filename, function(exists) {
        if(!exists) {
            response.writeHead(404, {"Content-Type": "text/plain"});
            response.write("404 Not Found\n");
            response.end();
            return;
        }

        if (fs.statSync(filename).isDirectory()) filename += '/index.htm';

        fs.readFile(filename, "binary", function(err, file) {
            if(err) {
                response.writeHead(500, {"Content-Type": "text/plain"});
                response.write(err + "\n");
                response.end();
                return;
            }

            response.writeHead(200);
            response.write(file, "binary");
            response.end();
        });
    });

    io.on('connection', function (socket) {
        console.log('connected to socket');
        setInterval(function(){
            socket.emit('drumVote', { hello: 'world' });
        }, 2000);

      socket.on('my other event', function (data) {
        console.log(data);
      });
    });
}).listen(3000);
*/
var express = require('express'),
    http = require('http');

var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);
io.on('connection', function(){io.emit('test', {testData: true});});
server.listen(8080);

var multiparty = require('multiparty'),
    //io = require('socket.io').listen(app),
    url = require("url"),
    path = require("path"),
    fs = require("fs"),
    port = 3000;

var parseMethod = 'getDrumVote';

io.on('changeParseMethod', function(data){
    parseMethod = data.changeTo;
    console.log(parseMethod);
});

function getMelody(emailBody){
    var regex = /([0-8]){8}/;
    var melody = emailBody.match(regex);
    return melody[0];
}

function getDrumVote(emailBody){
    var drumVoteStr = emailBody;
    drumVoteStr = JSON.parse(drumVoteStr)[0].trim().substr(0,1);
    if(drumVoteStr == "a" || drumVoteStr == "A"){
        return 0;
    } else if(drumVoteStr == "b" || drumVoteStr == "B"){
        return 1;
    } else if(drumVoteStr == "c" || drumVoteStr == "C"){
        return 2;
    } else if(drumVoteStr == "d" || drumVoteStr == "D"){
        return 3;
    } else {
        return drumVoteStr;
    }
}

/* serves main page */
app.get("/", function(req, res) {
    res.sendfile('index.html');
});

app.use(express.static(__dirname + '/sounds'));

app.post("/", function(req, res) {
    if (req.method === 'POST') {

        console.log("POST received");

        // parse a file upload
        var form = new multiparty.Form();

        form.parse(req, function(err, fields, files) {
            // See https://sendgrid.com/docs/API_Reference/Webhooks/parse.html for fields
            var who = JSON.stringify(fields.from);
            who = who.substr(2, who.indexOf("<") - 3);

            var bodyReturn = JSON.stringify(fields.text);
            bodyReturn = getDrumVote(bodyReturn);

            if(parseMethod == 'getDrumVote'){
                bodyReturn = getDrumVote(bodyReturn);
                io.emit('drumVote', {'drumInt': bodyReturn});
            } else if(parseMethod == 'getMelody'){
                bodyReturn = getMelodyVote(bodyReturn);
                io.emit('melodyPush', {'name': who, 'notes': bodyReturn});
            }

            console.log(who);
            console.log(bodyReturn);
        });

        return;
    }
    /* some server side logic */
    res.send("OK");
});

/* serves all the static files */
app.get(/^(.+)$/, function(req, res){
    console.log('static file request : ' + req.params[0]);
    if(req.params[0] != '/socket.io/'){
        res.sendFile( __dirname + req.params[0]);
    }
});

app.get('/sounds/'+/^(.+)$/, function(req, res){
    console.log('static file request : ' + req.params[0]);
    res.sendFile( __dirname + req.params[0]);
});

var port = process.env.PORT || 3000;
app.listen(port, function() {
    console.log("Listening on " + port);
});
