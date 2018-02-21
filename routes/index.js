var express = require('express');
var router = express.Router();
var {User} = require ('../models/user');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/register', function(req,res){
	res.render('register')
})

router.post('/register/add', function(req,res){
	var user = User.build({
		email: req.body.email,
		password: req.body.password,
	});
	user.save().then(()=>res.redirect('/'))
})

router.get('/login', function(req,res){
	res.render('login')
})

router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect('/users/private');
  });

module.exports = router;
