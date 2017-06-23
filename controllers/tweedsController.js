const Tweed = require('../models/tweed');
const User = require('../models/user');

const tweedsController = {};

tweedsController.index = (req, res) => {
  Tweed.findAll()
    .then(tweeds => {
      res.json({ 
        message: 'ok',
        data: { tweeds },
      });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({message: '400', err});
    });
};

tweedsController.show = (req, res) => {
  Tweed.findById(req.params.id)
    .then(tweed => {
      res.json({
        message: 'ok',
        data: { tweed },
      });
    })
    .catch(err => {
      res.status(400).json({message: '400', err});
    });
};

tweedsController.create = (req, res) => {
  console.log(req.body.user);
  User.findByUserName(req.body.user)
  .then((user) => {
    Tweed.create({
      userId: user.id,
      tweed: req.body.tweed,
      time: Date.now(),
      edited: false,
    })
    .then(tweed => {
      res.json({message: 'ok', data: { tweed }});
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({message: '400', err});
    });
  })
  .catch(err => {
      console.log(err);
      res.status(400).json({message: '400', err});
  });
};

tweedsController.update = (req, res) => {
  Tweed.update({
    tweed: req.body.tweed,
    edited_time: Date.now(),
  }, req.params.id)
    .then(tweed => {
      res.json({
        message: 'ok',
        data: { tweed },
      });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
};

tweedsController.destroy = (req, res) => {
  Tweed.destroy(req.params.id)
    .then(() => {
      res.json({message: 'tweed deleted'});
    })
    .catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
};

module.exports = tweedsController;