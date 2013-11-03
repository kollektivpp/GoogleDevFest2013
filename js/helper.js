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
	elem.className += ' ' + cssClass;
    setTimeout(function() {
        elem.className = elem.className.replace(' ' + cssClass,'');
    },150);
};