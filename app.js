/* setting up express */
const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
require('dotenv').config();
const app = express();

/* setting up port & listen */
const PORT = process.env.PORT || 3001;
app.listen(PORT, function() {
  console.log(`listening on port ${PORT}`);
});

/* setting static file */
app.use(express.static(path.join(__dirname, 'client/build')));
/* for dev*/
// app.use('/static', express.static(path.join(__dirname, 'public')));
/* setting up cors */
app.use(cors());
/* setting up logger */
app.use(logger('dev'));
/* setting up body parser */
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

/* setting routes */
/* ====================== INDEX ROUTE ========= */
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

/* for dev */
// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname + '/client/src/index.html'));
// });
/* tweeds API route */
const tweedRoutes = require('./routes/tweedroutes');
app.use('/api/tweeds', tweedRoutes);

const authRoutes = require('./routes/authRoutes');
app.use('/auth', authRoutes);

/* handling 404 */
app.get('*', function(req, res) {
  res.status(404).send({message: 'Oops! Not found.'});
});
