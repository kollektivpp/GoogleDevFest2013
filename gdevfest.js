// var 
    // app       = require('http').createServer(),
    // io        = require('socket.io').listen(app),
var arduino   = require('duino'),
    board     = new arduino.Board({ debug: true, baudrate: 9600 }),
    sockets   = [];

// app.listen(8000);

board.on('data', function(m){
    console.log(m);
});


var dataHandler = function(data) {

    var msgBus = filterKey(data),
        msg = clear(data);

    try {
        msg = JSON.parse(msg);
    } catch(e) {
        return;
    }

    console.log(msg);

};

var clear = function(data) {
    data = data.substr(3).replace(/\r\n/,'');

    return data.substr(0,data.length - 3);
};

var filterKey = function(data) {
    var firstBytes = data.substr(0,3),
        lastBytes = data.replace(/\r\n/,'').substr(data.length - 3),
        key = firstBytes[1],
        delimiter = firstBytes[0];

    if(firstBytes[2] === delimiter && lastBytes[1] === delimiter &&
       lastBytes[0] === key && lastBytes[2] === key) {
        return parseInt(key,10);
    } else {
        return 0;
    }
};
