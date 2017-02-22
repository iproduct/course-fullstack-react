/**
 * This file provided by IPT-Intellectual Products & Technologies (IPT)
 * is for non-commercial testing and evaluation purposes only. 
 * IPT reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

'use strict';

const fs = require('fs');
var path = require('path');
const Hapi = require('hapi');
const Good = require('good');
const Boom = require('boom');
// const JWT = require('jsonwebtoken');
const hapiAuthCookie = require('hapi-auth-cookie');
// const validate = require('./validate');

const SESSION_EXPIRATION_TIMEOUT = 3600; //Expire sessions automatically after 1h (in seconds)

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const testRoutes = require('./test.routes');
const userRoutes = require('./user.routes');
const authRoutes = require('./auth.routes');
const allRoutes = testRoutes.concat(userRoutes, authRoutes);

//Connection URL to db
const urlTestsAPI = 'mongodb://localhost:27017/tests';
const urlSessions = 'mongodb://localhost:27017/sessions';

//Never share your private key - use environment variable instead
const SECRET = 'BbZJjyoXAdr8BRZuiKKdRWimKfrSmQ6fv8kZ7OFfc';
// const SECRET = process.env.SECRET;

//Use connect to connect to db
Promise.all([
  MongoClient.connect(urlTestsAPI, { db: { w: 1 } })  //Connect to Test API DB
  // MongoClient.connect(urlSessions, { sessionsDB: { w: 1 } }) //Connect to sessions db
]).then(([db, sessionsDB]) => {

  // Expire sessions automaticaly after inactivity timeout
  // sessionsDB.collection('sessions')
  //   .ensureIndex( { "lastAccess": 1 }, { expireAfterSeconds: SESSION_EXPIRATION_TIMEOUT } )
  //   .catch(err => {
  //     console.err(`Unable to set auto expirration for sessions in MongoDB.`);
  //   });

  console.log(`Successfully connected to MongoDB server at: ${urlTestsAPI}`);
  // console.log(`Successfully connected to Sessions DB server at: ${urlSessions}`);

  //Create hapi server 
  const server = new Hapi.Server();
  server.connection({ port: 9000 });

  server.bind({
    db: db,
    // sessionsDB: sessionsDB,
    // SECRET: SECRET,
    // SESSION_EXPIRATION_TIMEOUT: SESSION_EXPIRATION_TIMEOUT
  });

  // Registering the Good plugin
  server.register([{
    register: Good,
    options: {
      reporters: {
        console: [{
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{
            error: '*',
            log: '*'
          }]
        }, {
            module: 'good-console'
          }, 'stdout']
      }
    }
  }, hapiAuthCookie], (err) => {
    if (err) {
      throw err;
    }

    server.auth.strategy('session', 'cookie', true, {
      password: SECRET,
      cookie: 'sid',
      redirectTo: '/login',
      isSecure: false,
      validateFunc: function (request, session, callback) {

        cache.get(session.sid, (err, cached) => {

          if (err) {
            return callback(err, false);
          }

          if (!cached) {
            return callback(null, false);
          }

          return callback(null, true, cached.account);
        });
      }
    });

    // Starting the server
    server.start((err) => {
      if (err) {
        throw err;
      }
      console.log('Server running at:', server.info.uri);
      // let token = JWT.sign({ accountId: 123 }, JWT_SECRET, { algorithm: 'HS256' });
      // console.log(`curl --header "Authorization: Bearer ${token}" ${server.info.uri}/api/withToken`);
    });
  });

  // Registering roots
  server.route(allRoutes);
})
  .catch((err) => { throw err; });
