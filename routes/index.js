var express = require('express');
var router = express.Router();
var user=require('../model/user_model');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});


module.exports = router;
