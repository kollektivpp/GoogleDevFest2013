Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
};

var $ = function(selector) {
    return document.querySelector(selector);
};

var soundIsPlaying = false;

var makeMove = function(elem,cssClass) {
    if ( soundIsPlaying === false ) {
        if ( cssClass === 'up' ) {
            soul.createStaticSound({"volume":80,"panning":0,"pitch":318,"character":0,"fatness":2,"noise":10,"damping":64,"attack":0,"release":0,"modulation":false,"delayTime":0,"delayVolume":50,"delayRepeat":false,"reverbTime":0,"reverbSpeed":50,"duration":300,"bang":false,"timePitch1":true,"timePitch2":true,"sequence":false,"timePitch1Value":468,"timePitch1Start":1,"timePitch1Duration":150,"timePitch2Value":318,"timePitch2Start":151,"timePitch2Duration":150}).play();
        }
        else if ( cssClass === 'middle' ) {
            soul.createStaticSound({"volume":80,"panning":0,"pitch":318,"character":0,"fatness":2,"noise":10,"damping":64,"attack":0,"release":0,"modulation":false,"delayTime":0,"delayVolume":50,"delayRepeat":false,"reverbTime":0,"reverbSpeed":50,"duration":300,"bang":false,"timePitch1":true,"timePitch2":true,"sequence":false,"timePitch1Value":420,"timePitch1Start":1,"timePitch1Duration":150,"timePitch2Value":318,"timePitch2Start":151,"timePitch2Duration":150}).play();
        }
        else if ( cssClass === 'down' ) {
            soul.createStaticSound({"volume":80,"panning":0,"pitch":318,"character":0,"fatness":2,"noise":10,"damping":64,"attack":0,"release":0,"modulation":false,"delayTime":0,"delayVolume":50,"delayRepeat":false,"reverbTime":0,"reverbSpeed":50,"duration":300,"bang":false,"timePitch1":true,"timePitch2":true,"sequence":false,"timePitch1Value":366,"timePitch1Start":1,"timePitch1Duration":150,"timePitch2Value":318,"timePitch2Start":151,"timePitch2Duration":150}).play();
        }
        soundIsPlaying = true;
    }

    elem.className += ' ' + cssClass;
    setTimeout(function() {
        elem.className = elem.className.replace(' ' + cssClass,'');
    },150);

    setTimeout( function() {
        soundIsPlaying = false;
    }, 300);
};