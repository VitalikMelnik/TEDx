'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function"); } }

var TextScramble = function () {
    function TextScramble(el) {
        _classCallCheck(this, TextScramble);

        this.el = el;
        this.chars = 'ABCDEFGHEGKLMNOPQRSTYQWEYZ';
        this.update = this.update.bind(this);
    }

    TextScramble.prototype.setText = function setText(newText) {
        var _this = this;

        var oldText = this.el.innerText;
        var length = Math.max(oldText.length, newText.length);
        var promise = new Promise(function (resolve) {
            return _this.resolve = resolve;
        });
        this.queue = [];
        for (var i = 0; i < length; i++) {
            var from = oldText[i] || '';
            var to = newText[i] || '';
            var start = Math.floor(Math.random() * 50);
            var end = start + Math.floor(Math.random() * 50);
            this.queue.push({ from: from, to: to, start: start, end: end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    };

    TextScramble.prototype.update = function update() {
        var output = '';
        var complete = 0;
        for (var i = 0, n = this.queue.length; i < n; i++) {
            var _queue$i = this.queue[i];
            var from = _queue$i.from;
            var to = _queue$i.to;
            var start = _queue$i.start;
            var end = _queue$i.end;
            var char = _queue$i.char;

            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += '<span class="dud">' + char + '</span>';
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    };

    TextScramble.prototype.randomChar = function randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    };

    return TextScramble;
}();


var phrases = ['Small', 'Small Action', 'Small Action -', 'Small Action - Great', 'Small Action - Great Changes'];

var el = document.querySelector('.text');
var fx = new TextScramble(el);
var coun = 0 ;
var counter = 0;
var next = function next() {
    fx.setText(phrases[counter]).then(function () {
        var gg =  setTimeout(next, 1000);
           ++coun;
        if(coun==5){
            clearTimeout(gg);
        }
    });
    counter = (counter + 1) % phrases.length;

};

next();