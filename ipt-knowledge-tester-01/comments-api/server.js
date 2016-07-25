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
const path = require('path');
const Hapi = require('hapi');
const Good = require('good');
const Boom = require('boom');
const routes = require('./routes');

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/tests';
// Use connect method to connect to the Server
MongoClient.connect(url, {db:{w:1}}, function(err, db) {
  assert.equal(null, err);
  console.log(`Connected correctly to MongoDB server at: ${url}`);

  // Create Hapi server
  const server = new Hapi.Server();
  server.connection({ port: 9000 });

  server.bind({ db: db });

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
  }], (err) => {
    if (err) {
      throw err;
    }

    // Starting the server
    server.start((err) => {
      if (err) {
        throw err;
      }
      console.log('Server running at:', server.info.uri);
    });
  });

  // Registering roots
  server.route(routes);
});

