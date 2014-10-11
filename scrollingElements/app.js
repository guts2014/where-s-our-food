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
    drumVoteStr = JSON.stringify(drumVoteStr).CharAt(0);
    return drumVoteStr;
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
            if(whatToFind == 'melody'){
                bodyText = getMelody(bodyText);
            } else if(whatToFind == 'drumVote'){
                bodyText = getDrumVote(bodyText);
            }

            console.log(who);
            console.log(bodyText);


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

    socket.on('setWhatToFind', function (data) {
        whatToFind = data.whatToFind;
        console.log(whatToFind);
    });
});
