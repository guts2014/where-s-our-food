global.soc = function(server, port, callback){
    var net = require("net");
    var socket = 0;

    this.init = function(){
        socket = net.Server();

        socket.listen(port, server);

        socket.on('connection', function(e){
            callback(e);
        });

        socket.on('listening', function(){
            console.log('Server listening');
        });

        socket.on('error', function(){
            console.log('Server connection error');
        });

        socket.on('close', function(){
            console.log('Server connection closed');
        });
    };

    this.send = function(data){
        socket.write(data, function(e){
            console.log('data sent');
        });
    };

    this.close = function(){
        socket.destroy();
    };

    this.init();

};

var connection = new soc("localhost", 8080, function(e){
    console.log(e);
});
