'use strict';

const express = require('express'),
	app = express(),
	cookieParser = require('cookie-parser'),
	expressSession = require('express-session'),
	passport = require('passport'),
	request = require('request'),
	Strategy = require('passport-twitter').Strategy;

//Invoke express middle-ware
app.use(
	expressSession({
		resave: false,
		saveUninitialized: true,
		secret: 'nikki is god'
	})
);
app.use(passport.initialize());
app.use(passport.session());

//Dummy user
passport.serializeUser(function(user,done) {
	console.log('User called');
	return done(null, user);
})

passport.deserializeUser(function(id,done) {
	User.findOrCreate({id}, function(err, user) {
		cb(err, users);
	})
});

//Render pages
app.set('view engine', 'pug');
app.set('views', 'views');
app.use(express.static('resources'));

app.use(express.json());
app.use(
	express.urlencoded({
		extended: true
	})
);

//Dummy user
passport.serializeUser(function(user,done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user)
	{
		done(err,user);
	})
})

//Twitter strategy login
passport.use(
	new Strategy(
		{
			consumerKey: 'QNApeQ0OtpAwTuIFUU2FBoudO',
			consumerSecret: 'LexAvAikuXYJMxCoNCPhUJ0Vq6GKN2qHaqb4Q5VxnjuCXdvbP1',
			callbackURL: 'http://127.0.0.1:3000/auth/twitter/callback',
			passReqToCallback: true,
		},
		function(token, tokenSecret, profile, cb) {
			User.findOrCreate({twitterId : profile.id},
				function (err, user) {
					return cb(err, user);
				});
		}
	)
);

//Landing page route
app.get('/', function(req, res) {
	request(
		{ url: 'http://fourtonfish.com/hellosalut/?mode=auto', json: true },
		function(err, response, body) {
			console.log('Requesting');
			const hello = body;
			res.render('layout', hello);
		}
	);
});

app.get('/loginpage', function(req,res){
	request(
		{ url: 'http://fourtonfish.com/hellosalut/?mode=auto', json: true },
		function(err, response, body) {
			console.log('Requesting');
			const hello = body;
			res.render('loginpage', hello);}
	)
})

//Twitter Auth route
app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback',
	passport.authenticate('twitter', {
		successRedirect: '/loginpage',
		failureRedirect: '/'
	})
);


//Server listener
const server = app.listen(3000, function() {
	console.log(`Running on port ${server.address().port}`);
});
