const http = require('http');
const express = require('express');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
var bodyparser = require('body-parser');
const morgan = require('morgan');
const webServerConfig = require('../config/web-server.js');
const router = require('./router.js');
const viewRouter = require('./viewRouter.js');
const user = require('../db_apis/users.js');
const passport = require("passport");
const LocalStrategy = require("passport-local");
let httpServer;

async function initialize() {
  return new Promise((resolve, reject) => {
    const app = express();
    httpServer = http.createServer(app);

    // Combines logging info from request and response
    // app.use(morgan('combined'));

    // view engine setup
    app.set('views', path.join(__dirname + '/..', 'views'));
    app.set('view engine', 'ejs');
    app.use(expressLayouts);

    app.use(
      bodyparser.urlencoded({     // to support URL-encoded request bodies
      extended: true
    }));

    app.use(express.static('public'));

    //passport configuration
    app.use(require("express-session")({
      secret: "IReallyAmSoEffinRock",
      resave: false,
      saveUninitialized: false
    }));

    var User = [
      {username:'test'},
    ];

    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(new LocalStrategy(
      async function (username, password, done) {
        function proceed (verified, payload) {
          if (verified === true) {
            return done(null, { name: username, role: payload.role, id: '1234' });
          } else {
            return done(null, false, { message: 'Incorrect cred.' });
          }
        }
        dbverify = await user.dbverify(username, password, proceed);
      })
    );

    passport.serializeUser(function (user, done) {
      done(null, user);
    });

    passport.deserializeUser(function (username, done) {
      done(null, { name: username, nickname: "test" })
    });

    // Mount the router at /api so all its routes start with /api
    app.use('/api', router);

    // Mount the view router at /
    app.use('/', viewRouter);

    app.post('/login',
      passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
      })
    );

    httpServer.listen(webServerConfig.port)
      .on('listening', () => {
        console.log(`Web server listening on localhost:${webServerConfig.port}`);
        resolve();
      })
      .on('error', err => {
        reject(err);
      });
  });
}

module.exports.initialize = initialize;

function close() {
  return new Promise((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}

module.exports.close = close;
