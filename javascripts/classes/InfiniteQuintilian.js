var _ = require('lodash');
var RiTa = require('rita');

function InfiniteQuintilian() {
	if(typeof(Storage) !== 'undefined') {
		this.sentenceQueue = JSON.parse(localStorage.getItem('iq-sentenceQueue'));
	} 
	
	if (this.sentenceQueue === null || this.sentenceQueue === undefined) {
		this.sentenceQueue = [];
	}
	this.rm = undefined;
	
}

InfiniteQuintilian.prototype.generateSentences = function() {
	if(this.rm === undefined) {
		var quintilian = require('../../data/quintilian.txt');
		this.rm = new RiMarkov(4);
		this.rm.loadText(quintilian.toString().replace(/\n/,' '));
	}
	
	return this.rm.generateSentences(50);
}

InfiniteQuintilian.prototype.get_copia = function(number) {
	var copia = [];
	if(number === undefined) {
		number = 1;
	}
	_.times(number, function() {
		copia.push(this.sentence());
	}.bind(this));
	
	return copia;
}

InfiniteQuintilian.prototype.sentence = function() {
	var sentence;
	if(this.sentenceQueue.length == 0) {
		this.sentenceQueue = this.generateSentences();
	}
	sentence = this.sentenceQueue.pop();
	
	if(typeof(Storage) !== 'undefined') {
		localStorage.setItem('iq-sentenceQueue', JSON.stringify(this.sentenceQueue));
	}
	
	return sentence;
}

module.exports = InfiniteQuintilian;