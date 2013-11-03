var socket = io.connect('http://localhost:8000'),
    buttons = {
        b:      [62,94,110,118,126],
        start:  [59,91,107,115,123],
        select: [61,93,109,117,125],
        left:   [95],
        top:    [119],
        right:  [63],
        bottom: [111]
    };

socket.on('button',function(msg) {
    var id = msg.id;

    for (var i = buttons.length - 1; i >= 0; i--) {
        if(buttons[i].contains(id)) {
            console.log(button);
        }
    }

    // console.log(document.querySelector('body').style.backgroundColor);
    // document.querySelector('body').style.backgroundColor = 'rgb(' + id + ',' + id + ',' + id + ')';
}.bind(this));