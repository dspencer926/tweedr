const bcrypt = require('bcryptjs');
const User = require('../models/user');

const usersController = {};

usersController.create = (req, res, next) => {
  User.findByUserName(req.body.username)
  .then((result) => {
    if (result){
      res.json({'message': 'User already exists'});
    } else {
      
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync(req.body.password, salt);

    User.create({
      username: req.body.username,
      password: hash,
      admin: false,
    })
      .then(user => {
        req.login(user, err => {
          if (err) return next(err);
          res.json({'message': 'ok', 'user': user.username});
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
    }
  });
};

module.exports = usersController;