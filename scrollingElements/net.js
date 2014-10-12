global.soc = function(server, port, callback){
    var net = require("net");
    var socket = 0;

    this.init = function(){
        socket = net.Socket({
            allowHalfOpen: false,
            readable: true,
            writable: true
        });
        socket.connect(port, server);

        socket.on('connect', function(e){
            console.log('connected');
        });
        socket.on('timeout', function(){
            console.log('socket timeout');
        });

        socket.on('error', function(){
            console.log('Socket connection error');
        });

        socket.on('close', function(){
            console.log('Socket connection closed');
        });

        socket.on('data', function(data){
            callback(data);
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
