var _ = require('lodash');
var twitter = require('twode');
var BotEnvironment = require('twitter-bot-environment');
var path = require('path');
var fs = require('fs');
var Redis = require('ioredis');

var environment = new BotEnvironment();

function Bot(handle) {
	this.handle = handle.charAt(0) === '@' ? handle : '@' + handle;
	this.twitter = new twitter(environment.getEnvironment());
	this.sentenceQueue = null;
	if(process.env.REDIS_SERVER === undefined) {
		this.redis_client = new Redis();
	} else {
		this.redis_client = new Redis(process.env.REDIS_SERVER);
	}
	this.redis_client.get('sentence_queue', (err, reply) => {
		if(reply == null) {
			this.sentenceQueue = [];
		} else {
			this.sentenceQueue = JSON.parse(reply);
		}
	});
}

Bot.prototype.truncate_tweet = function(tweet) {
	return (tweet.length > 140) ? _.truncate(tweet, {length: 140, omission: '…'}) : tweet;
}

Bot.prototype.generateSentences = function() {
	var RiTa = require('rita');
	var quintilian = fs.readFileSync('./data/quintilian.txt');

	rm = new RiTa.RiMarkov(4);
	rm.loadText(quintilian.toString().replace(/\n/,' '));
	
	return rm.generateSentences(50);
}

Bot.prototype.run = function() {
	if(this.sentenceQueue === undefined || this.sentenceQueue === null) {
		setTimeout(this.run.bind(this), 100);
		return;
	}
	if(this.sentenceQueue.length == 0) {
		this.sentenceQueue = this.generateSentences();
	}
	sentence = this.sentenceQueue.pop();
	this.redis_client.set('sentence_queue', JSON.stringify(this.sentenceQueue));
	console.log(this.truncate_tweet(sentence));
	bot.redis_client.end(true);
}

var bot = new Bot('@quintilian_bot');
bot.run();