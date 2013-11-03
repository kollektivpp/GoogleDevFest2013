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

    console.log(id);

    for(var button in buttons) {
        if(buttons[button].contains(id)) {

            if(id === 118) {
                makeMove($('x-arm.left'),'up');
            }

            if(id === 94) {
                makeMove($('x-arm.left'),'middle');
            }

            if(id === 110) {
                makeMove($('x-arm.left'),'down');
            }

        }
    }

    // console.log(document.querySelector('body').style.backgroundColor);
    // document.querySelector('body').style.backgroundColor = 'rgb(' + id + ',' + id + ',' + id + ')';
});

socket.on('disco', function(msg) {
    if(msg.state) {
        $('#bg-wrapper').className = ' disco';
    } else {
        $('#bg-wrapper').className = '';
    }
});