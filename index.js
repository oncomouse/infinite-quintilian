var _ = require('lodash');
var twitter = require('twode');
var BotEnvironment = require('twitter-bot-environment');
var path = require('path');
var fs = require('fs');

var environment = new BotEnvironment();

function Bot(handle) {
	this.handle = handle.charAt(0) === '@' ? handle : '@' + handle;
	this.twitter = new twitter(environment.getEnvironment());
}

Bot.prototype.truncate_tweet = function(tweet) {
	return (tweet.length > 140) ? _.truncate(tweet, {length: 140, omission: '…'}) : tweet;
	try {
		this.sentenceQueue = JSON.parse(fs.readFileSync('./queue.json').toString());
	} catch(err) {
		this.sentenceQueue = [];
	}
}

Bot.prototype.generateSentences = function() {
	var RiTa = require('rita');
	var quintilian = fs.readFileSync('./data/quintilian.txt');

	rm = new RiTa.RiMarkov(4);
	rm.loadText(quintilian.toString().replace(/\n/,' '));
	
	return rm.generateSentences(50);
}

Bot.prototype.run = function() {
	if(this.sentenceQueue === undefined || this.sentenceQueue === null || this.sentenceQueue.length == 0) {
		this.sentenceQueue = this.generateSentences();
	}
	sentence = this.sentenceQueue.pop();
	fs.writeFile('./queue.json', JSON.stringify(this.sentenceQueue, null, 4), function(err) {
		if(err) {
			console.log(err);
		}
	});
	console.log(this.truncate_tweet(sentence));
}

var bot = new Bot('@quintilian_bot');
bot.run();