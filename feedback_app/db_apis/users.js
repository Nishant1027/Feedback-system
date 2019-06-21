var bcrypt = require('bcrypt-node');
const oracledb = require('oracledb');
const config = require('../config/database.js');

function dbverify(username, password, callback) {
  oracledb.getConnection(
    config.feedbackPool,
    function (err, connection) {
      connection.execute(
        'select email as "email", ' +
        '   password as "password", ' +
        '   role as "role" ' +
        'from jsao_users ' +
        'where email = :email',
        {
          email: username.toLowerCase()
        },
        {
          outFormat: oracledb.OBJECT
        },
        function (err, results) {
          if (err) {
            console.log(err);
            callback(false, null);
          }
          var user;
          user = results.rows[0];
          if (user == undefined) {
            console.log("auth fail");
            callback(false, null);
          }
          bcrypt.compare(password, user.password, function (err, pwMatch) {
            var payload;
            if (!pwMatch) {
              console.log("auth fail");
              callback(false, null);
            }
            payload = {
              sub: user.email,
              role: user.role
            };
            console.log("auth pass");
            callback(true, payload);
          });
        });
    }
  );
}

module.exports.dbverify = dbverify;

function post(req, res, next) {
  var user = {
    email: req.body.username
  };
  var unhashedPassword = req.body.password;

  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(unhashedPassword, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }

      user.hashedPassword = hash;

      insertUser(user, function (err, user) {
        var payload;

        if (err) {
          return next(err);
        }

        payload = {
          sub: user.email,
          role: user.role
        };
      });
      res.redirect("/");
    });
  });
}

module.exports.post = post;

function insertUser(user, cb) {
  oracledb.getConnection(
    config.feedbackPool,
    function (err, connection) {
      if (err) {
        return cb(err);
      }

      connection.execute(
        'insert into jsao_users ( ' +
        '   email, ' +
        '   password, ' +
        '   role ' +
        ') ' +
        'values (' +
        '    :email, ' +
        '    :password, ' +
        '    \'BASE\' ' +
        ') ' +
        'returning ' +
        '   id, ' +
        '   email, ' +
        '   role ' +
        'into ' +
        '   :rid, ' +
        '   :remail, ' +
        '   :rrole',
        {
          email: user.email.toLowerCase(),
          password: user.hashedPassword,
          rid: {
            type: oracledb.NUMBER,
            dir: oracledb.BIND_OUT
          },
          remail: {
            type: oracledb.STRING,
            dir: oracledb.BIND_OUT
          },
          rrole: {
            type: oracledb.STRING,
            dir: oracledb.BIND_OUT
          }

        },
        {
          autoCommit: true
        },
        function (err, results) {
          if (err) {
            connection.release(function (err) {
              if (err) {
                console.error(err.message);
              }
            });

            return cb(err);
          }

          cb(null, {
            id: results.outBinds.rid[0],
            email: results.outBinds.remail[0],
            role: results.outBinds.rrole[0]
          });

          connection.release(function (err) {
            if (err) {
              console.error(err.message);
            }
          });
        });
    }
  );
}

function insertUser2(user, cb) {
  oracledb.getConnection(
    config.feedbackPool,
    function (err, connection) {
      if (err) {
        return cb(err);
      }

      connection.execute(
        'insert into jsao_users ( ' +
        '   email, ' +
        '   password, ' +
        '   role ' +
        ') ' +
        'values (' +
        '    :email, ' +
        '    :password, ' +
        '    \'TEACH\' ' +
        ') ' +
        'returning ' +
        '   id, ' +
        '   email, ' +
        '   role ' +
        'into ' +
        '   :rid, ' +
        '   :remail, ' +
        '   :rrole',
        {
          email: user.email.toLowerCase(),
          password: user.hashedPassword,
          rid: {
            type: oracledb.NUMBER,
            dir: oracledb.BIND_OUT
          },
          remail: {
            type: oracledb.STRING,
            dir: oracledb.BIND_OUT
          },
          rrole: {
            type: oracledb.STRING,
            dir: oracledb.BIND_OUT
          }

        },
        {
          autoCommit: true
        },
        function (err, results) {
          if (err) {
            connection.release(function (err) {
              if (err) {
                console.error(err.message);
              }
            });

            return cb(err);
          }

          cb(null, {
            id: results.outBinds.rid[0],
            email: results.outBinds.remail[0],
            role: results.outBinds.rrole[0]
          });

          connection.release(function (err) {
            if (err) {
              console.error(err.message);
            }
          });
        });
    }
  );
}

function post2(req, res, next) {
  var user = {
    email: req.body.username
  };
  var unhashedPassword = req.body.password;

  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }

    bcrypt.hash(unhashedPassword, salt, null, function (err, hash) {
      if (err) {
        return next(err);
      }

      user.hashedPassword = hash;

      insertUser(user, function (err, user) {
        var payload;

        if (err) {
          return next(err);
        }

        payload = {
          sub: user.email,
          role: user.role
        };
      });
    });
  });
  next();
}

module.exports.post2 = post2;