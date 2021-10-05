const { response } = require('express');
var express = require('express');
var router = express.Router();
var productHelper = require('../helpers/product-helpers')
var userhelpers = require('../helpers/user-helpers')
/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('user/home')
});

router.get('/user-signup', (req, res) => {
  res.render('user/signup')
})

router.get('/user-signin', (req, res) => {
  res.render('user/login')
})

router.get('/dogretailvet', (req, res) => {
  res.render('user/dogretail&vet')
})

router.get('/catretailvet', (req, res) => {
  res.render('user/catretail&vet')
})

router.get('/doggrooming', (req, res) => {
  res.render('user/doggrooming')
})

router.get('/catgrooming', (req, res) => {
  res.render('user/catgrooming')
})

//user signup
router.post('/signup', (req, res) => {
  userhelpers.doSignup(req.body).then((response) => {
    // console.log(req.body);
    res.redirect('/user-signin')
  })
})

// user signin
router.post('/login', (req, res) => {
  userhelpers.userLogin(req.body).then((response) => {
    if (response.status)
      res.redirect('/')
    else
      res.redirect('/user-signin')
  })
})






module.exports = router;
