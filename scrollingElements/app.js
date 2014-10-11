var multiparty = require('multiparty');
var http = require('http');
var io = require('socket.io')(app);
var fs = require('fs');
var port = 8080;

var app = http.createServer(function(req, res) {
  if (req.method === 'POST') {
    console.log("POST received");
    // parse a file upload
    var form = new multiparty.Form();

    form.parse(req, function(err, fields, files) {
      // See https://sendgrid.com/docs/API_Reference/Webhooks/parse.html for fields
      console.log(fields.from);
      console.log(fields.text);


    });

    return;
    }
}).listen(port);

console.log('Listening on port %d', port);

io.on('connection', function (socket) {
    setInterval(function(){
        var randInt = Math.floor(Math.random() * 4);
        socket.emit('drumVote', { drumInt: randInt });
    }, 1000);

    socket.on('my other event', function (data) {
        console.log(data);
    });
});
