// var 
var app       = require('http').createServer(),
    io        = require('socket.io').listen(app),
    arduino   = require('duino'),
    board     = new arduino.Board({ debug: true, baudrate: 9600 }),
    sockets   = [];

io.sockets.on('connection', function (socket) {
    sockets.push(socket);
});

var dataHandler = function(data) {

    try {
        msg = JSON.parse(data);
    } catch(e) {
        return;
    }

    sockets.forEach(function(socket) {
        socket.emit('button', msg);
    });

};

app.listen(8000);
board.on('data', dataHandler);
