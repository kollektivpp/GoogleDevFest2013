music = new Audio('./music/dnb.mp3');
music.loop = true;
music.play();


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
        soul.createStaticSound({"volume":75,"panning":0,"pitch":608,"character":0,"fatness":0,"noise":0,"damping":0,"attack":0,"release":0,"modulation":true,"delayTime":0,"delayVolume":50,"delayRepeat":false,"reverbTime":0,"reverbSpeed":50,"duration":4152,"bang":false,"timePitch1":false,"timePitch2":false,"sequence":true,"sequenceObjects":[{"pitch":568,"duration":2},{"pitch":593,"duration":2},{"pitch":568,"duration":2},{"pitch":608,"duration":3},{"pitch":593,"duration":13},{"pitch":20,"duration":1},{"pitch":593,"duration":4},{"pitch":585,"duration":4},{"pitch":568,"duration":4}],"modPitch":true,"modVolume":false,"modDamping":false,"modIntensity":2,"modSpeed":97,"modCharacter":1}).play();
    } else {
        $('#bg-wrapper').className = '';
    }
});