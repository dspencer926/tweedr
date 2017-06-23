const express = require('express');
const controller = require('../controllers/usersController');

const router = express.Router();

const authHelpers = require('../services/auth/authHelpers');
const passport = require('../services/auth/local');

router.post('/register', controller.create);

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err); }
    if (!user) { return res.json({message: info})}
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.json({'message': 'ok', 'user': user.username});
    });
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.json({'message': 'ok'});
});

module.exports = router;
