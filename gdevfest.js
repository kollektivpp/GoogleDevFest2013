// var 
var app       = require('http').createServer(),
    io        = require('socket.io').listen(app),
    arduino   = require('duino'),
    express   = require('express'),
    api       = express(),
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

api.get('/disco/on', function(req, res){
    res.send('disco time!');
    sockets.forEach(function(socket) {
        socket.emit('disco', {state: true});
    });
});

api.get('/disco/off', function(req, res){
    res.send('noooo disco time!');
    sockets.forEach(function(socket) {
        socket.emit('disco', {state: false});
    });
});

api.listen(9000);
app.listen(8000);
board.on('data', dataHandler);
