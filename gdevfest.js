// var 
var app       = require('http').createServer(),
    io        = require('socket.io').listen(app),
    express   = require('express'),
    api       = express(),
    BTSP      = require('bluetooth-serial-port'),
    serial    = new BTSP.BluetoothSerialPort(),
    sockets   = [],
    buffer    = '';

// store all connected sockets
io.sockets.on('connection', function (socket) {
    sockets.push(socket);
});

// [GET] /disco/on - turns on disco mode
api.get('/disco/on', function(req, res){
    res.send('disco time!');
    sockets.forEach(function(socket) {
        socket.emit('disco', {state: true});
    });
});

// [GET] /disco/off - turns off disco mode
api.get('/disco/off', function(req, res){
    res.send('noooo disco time!');
    sockets.forEach(function(socket) {
        socket.emit('disco', {state: false});
    });
});
 
// check for bluetooth sender
serial.on('found', function(address, name) {
 
    // check the found address with the address of the
    // bluetooth enabled Arduino device here.
    if(name !== 'HC-05') {
        return false;
    }

    console.log('found bluetooth module',name, 'at address',address);
 
    serial.findSerialPortChannel(address, function(channel) {
        
        console.log('found channel: ',channel);
        serial.connect(address, channel, function() {

            serial.on('data', function(data) {

                data = data.toString('utf-8');

                if(data[0] === '{') {
                    sendChunk(buffer.replace(/\r\n/,''));
                    buffer = '';
                }

                buffer += data;

                try {
                    msg = JSON.parse(data);
                } catch(e) {
                    return;
                }

                sockets.forEach(function(socket) {
                    socket.emit('button', msg);
                });

            });

        }, function () {
            console.log('cannot connect');
        });
    });
});

var sendChunk = function(msg) {
    console.log(msg);
    try {
        msg = JSON.parse(msg);
        sockets.forEach(function(socket) {
            socket.emit('button', msg);
        });
    } catch(e) {
        console.log('bad chunk, sending failed!');
        return;
    }
};
 
serial.inquire();
api.listen(9000);
app.listen(8000);