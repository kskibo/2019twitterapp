let passport = require('passport'),
	TwitterStrategy = require('passport-twitter');

passport.use(
	new TwitterStrategy({
		consumerKey: TWITTER_CONSUMER_KEY,
		consumerSecret: TWITTER_CONSUMER_SECRET,
		callbackURL: 'http://localhost:3000/auth/twitter/callback',
		function(token, tokenSecret, profile, done) {
			URLSearchParams.findOrCreate(...URLSearchParams, function(err, user) {
				if (err) {
					return done(err);
				}
				done(null, user);
			});
		}
	})
);
