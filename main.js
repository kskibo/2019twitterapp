'use strict';

let tweeter = require('./resources/js/tweeter.js');
let helloNew = require('./modules/languagefunctionality.js');
let langMod = require('./modules/languageModule.js');


const express = require('express'),
	app = express(),
	cookieParser = require('cookie-parser'),
	expressSession = require('express-session'),
	passport = require('passport'),
	request = require('request'),
	Strategy = require('passport-twitter').Strategy;

//Render pages
app.set('view engine', 'pug');
app.set('views', 'views');
app.use(express.static('resources'));

//Invoke express middle-ware
app.use(
	expressSession({
		resave: false,
		saveUninitialized: true,
		secret: 'nikki is god'
	})
);

app.use(express.json());
app.use(
	express.urlencoded({
		extended: true
	})
);

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

//Dummy user
passport.serializeUser(function(user,callback) {
	callback(null, user);
});

passport.deserializeUser(function(obj, callback) {
	callback(null,obj);
});


//Twitter strategy login
passport.use(
	new Strategy(
		{
			consumerKey: 'QNApeQ0OtpAwTuIFUU2FBoudO',
			consumerSecret: 'LexAvAikuXYJMxCoNCPhUJ0Vq6GKN2qHaqb4Q5VxnjuCXdvbP1',
			callbackURL: 'http://localhost:3000/auth/twitter/callback',
		},
		function(token, tokenSecret, profile, cb) {
				cb(null, profile);
			}
	));

//blocks users from accessing pages if they're not logged in
function isLoggedIn(req,res,next) {
	if(req.isAuthenticated())
		return next();

	res.redirect('/');
}


//Landing page route
app.get('/options', isLoggedIn, function(req, res) {
	res.render('options',{words1:ranHello()});
});
//{words1:randomnum()}

//the API accesses the user's IP address to send a corresponding hello
app.get('/', function(req,res){
	request(
		{ url: 'http://fourtonfish.com/hellosalut/?mode=auto', json: true },
		function(err, response, body) {
			console.log('Requesting');
			const hello = body;
	res.render('home',hello);
		});
});

// on button a(href='/about') to load new page, nothing needed serverside
app.get('/about', isLoggedIn, function(req,res){
	res.render('final-page');

});

//what creates and sends out tweet
// app.get('/tweet', function(req,res){
// 	console.log(newHello);
// 	tweeter.makeTweet(req,res,newHello); 

function ranHello(){
    let randomnum = (parseInt(Math.random() * langMod.length -1 ));
	let helloLC = String(langMod[randomnum].language);
	let helloCC = String(langMod[randomnum].country);
    return(helloLC + ' from '  + helloCC + '!');
}


app.post('/tweet',function(req){
	if(req.body.text){
		let words = ranHello();
		tweeter.makeTweet(words);
	}
});

//Twitter Auth route
app.get('/auth/twitter', passport.authenticate('twitter'));

app.get('/auth/twitter/callback',
	passport.authenticate('twitter', {
		successRedirect: '/options',
		failureRedirect: '/' 
}));

//Server listener
const server = app.listen(3000, function() {
	console.log(`Running on port ${server.address().port}`);
});
