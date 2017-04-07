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
const Sqlite3 = require('sqlite3');
const routes = require('./routes');

// Initialize DB
const DB_FILE = path.join(__dirname, 'comments.sqlite');
const TABLE_NAME = 'comments';
const db = new Sqlite3.Database(DB_FILE, (err) => {
  //Test if comments table exists - if not create it
  db.get(`SELECT name FROM sqlite_master WHERE type='table' AND name=?;`, [TABLE_NAME], 
    (err, result) => {
      console.log(result);
        if(err) throw err;
        if (!result) {
            db.run(`CREATE TABLE comments (id INTEGER PRIMARY KEY, author TEXT, text TEXT);`, 
              function(err) {
                  if(err) throw err;
                  console.log(`Table "comments" successfully created in db: ${DB_FILE}`);
            });
        }
  });
});

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

