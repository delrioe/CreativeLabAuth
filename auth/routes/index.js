var express = require('express');
var router = express.Router();
var expressSession = require('express-session');

var mongoose = require('mongoose');
var Items = mongoose.model('Items');


var users = require('../controllers/users_controller');
console.log("before / Route");
router.get('/', function(req, res) {
    console.log("/ Route");
    //    console.log(req);
    console.log(req.session);
    if (req.session.user) {
        console.log("/ Route if user");
        res.render('index', {
            username: req.session.username,
            msg: req.session.msg,
            color: req.session.color
        });
    }
    else {
        console.log("/ Route else user");
        req.session.msg = 'Access denied!';
        res.redirect('/login');
    }
});
router.get('/user', function(req, res) {
    console.log("/user Route");
    if (req.session.user) {
        res.render('user', { msg: req.session.msg });
    }
    else {
        req.session.msg = 'Access denied!';
        res.redirect('/login');
    }
});
router.get('/signup', function(req, res) {
    console.log("/signup Route");
    if (req.session.user) {
        res.redirect('/');
    }
    res.render('signup', { msg: req.session.msg });
});
router.get('/login', function(req, res) {
    console.log("/login Route");
    if (req.session.user) {
        res.redirect('/');
    }
    res.render('login', { msg: req.session.msg });
});
router.get('/logout', function(req, res) {
    console.log("/logout Route");
    req.session.destroy(function() {
        res.redirect('/login');
    });
});
router.post('/signup', users.signup);
router.post('/user/update', users.updateUser);
router.post('/user/delete', users.deleteUser);
router.post('/login', users.login);
router.get('/user/profile', users.getUserProfile);



// //THIS IS FROM THE ITEMS

router.param('candidate', function(req, res, next, id) {
    var query = Items.findById(id);
    query.exec(function(err, candidate) {
        if (err) { return next(err); }
        if (!candidate) { return next(new Error("can't find candidate")); }
        req.candidate = candidate;
        return next();
    });
});

router.get('/voting/:candidate', function(req, res) {
    res.json(req.candidate);
});

router.put('/voting/:candidate/upvote', function(req, res, next) {
    console.log("Put Route" + req.candidate.Name);
    req.candidate.upvote(function(err, candidate) {
        if (err) { return next(err); }
        res.json(candidate);
    });
});

router.delete('/voting/:candidate', function(req, res) {
    req.candidate.remove();
    res.sendStatus(200);
});

router.get('/voting', function(req, res, next) {
    console.log("Get Route");
    Items.find(function(err, candidates) {
        if (err) { console.log("Error"); return next(err); }
        res.json(candidates);
        console.log("res.json Get Route");
    });
    console.log("returningGet Route");
});

router.post('/voting', function(req, res, next) {
    console.log("Post Route");
    var candidate = new Items(req.body);
    console.log("Post Route");
    console.log(candidate);
    candidate.save(function(err, candidate) {
        console.log("Error " + err);
        if (err) { return next(err); }
        console.log("Post Route before json");
        res.json(candidate);
    });
});

module.exports = router;





















