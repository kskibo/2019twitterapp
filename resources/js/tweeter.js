'use strict';

const Twitter = require('twitter');
exports.makeTweet = function(text) {
    let client = new Twitter({
        consumer_key: 'QNApeQ0OtpAwTuIFUU2FBoudO',
        consumer_secret: 'LexAvAikuXYJMxCoNCPhUJ0Vq6GKN2qHaqb4Q5VxnjuCXdvbP1',
        access_token_key: '2655126222-TGaIaMMc0pHztcL1yl6NnlVpjqKqDtkOGHrvS51',
        access_token_secret: 'olXthro5y8I6Q8xf1nSFZLGmvEU9eu1JxhcEFmcaOYFS4'
    });
    client.post('statuses/update', { status: text }, function(err, tweet) {
        if (err) {
            console.log(err);
        }
        if (!err) {
            console.log(tweet);
        }
    });
};