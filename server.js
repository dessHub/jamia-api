
const express = require('express'),
      morgan = require('morgan'),
      bodyParser = require('body-parser'),
      cors = require('cors'),
      connectToDb = require('./config/connect'),
      dotenv = require('dotenv'),
      mongoose = require('mongoose'),
      passport = require('passport'),
      flash    = require('connect-flash'),
      cookieParser = require('cookie-parser'),
      session      = require('express-session'),
      path    = require('path');

const app = express();

connectToDb();
require('./config/passport')(passport); // pass passport for configuration

app.use(cors());
// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating
app.use(express.static(path.join(__dirname, 'public')));

// required for passport
app.use(session({ secret: 'thisisasecret' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
const auth = require('./routes/authfile'); // load our routes and pass in our app and fully configured passport
const admin = require('./routes/admin');
const api  = require('./routes/api');
app.use('/auth', auth);
app.use('/api', api);
app.use('/admin', admin);

//test endpoint
app.get('/', (req, res) => {
    res.send("Hello Jamia")
})

app.listen(process.env.PORT || 3000, () => {
    console.log('starter listening on port 3000');
});

module.exports = app;