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

var makeMove = function(elem,cssClass) {
    soul.createStaticSound({"volume":50,"panning":0,"pitch":318,"character":0,"fatness":0,"noise":0,"damping":0,"attack":5,"release":10,"modulation":false,"delayTime":0,"delayVolume":50,"delayRepeat":false,"reverbTime":0,"reverbSpeed":50,"duration":152,"bang":false,"timePitch1":true,"timePitch1Value":422,"timePitch1Start":1,"timePitch1Duration":168,"timePitch2":false,"sequence":false}).play();
	elem.className += ' ' + cssClass;
    setTimeout(function() {
        elem.className = elem.className.replace(' ' + cssClass,'');
        soul.createStaticSound({"volume":50,"panning":0,"pitch":442,"character":0,"fatness":0,"noise":0,"damping":0,"attack":16,"release":10,"modulation":false,"delayTime":0,"delayVolume":50,"delayRepeat":false,"reverbTime":0,"reverbSpeed":50,"duration":168,"bang":true,"timePitch1":true,"timePitch1Value":256,"timePitch1Start":1,"timePitch1Duration":168,"timePitch2":false,"sequence":false}).play();
    },150);
};