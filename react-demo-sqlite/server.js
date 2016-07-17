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

const COMMENTS_FILE = path.join(__dirname, 'comments.json');

const server = new Hapi.Server();
server.connection({ port: 9000 });


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
server.route([{
  method: 'GET',
  path: '/api/comments',
  handler: function (request, reply) {
    fs.readFile(COMMENTS_FILE, function (err, data) {
      if (err) {
        throw err;
      }
      reply(JSON.parse(data));
    });
  }
},
  {
    method: 'POST',
    path: '/api/comments',
    handler: function (request, reply) {
      request.t
      fs.readFile(COMMENTS_FILE, function (err, data) {
        if (err) {
          throw err;
        }
        var comments = JSON.parse(data);
        var newComment = {
          id: Date.now(),
          author: request.payload.author,
          text: request.payload.text,
        };
        comments.push(newComment);
        fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function (err) {
          if (err) {
            throw err;
          }
          reply(comments);
        });
      });
    }
  },
  {
    method: 'DELETE',
    path: '/api/comments/{id}',
    handler: function (request, reply) {
      fs.readFile(COMMENTS_FILE, function (err, data) {
        if (err) {
          throw err;
        }
        let comments = JSON.parse(data);
        let deleted;
        comments = comments.filter((comment, index) => {
          if (comment.id === parseInt(request.params.id)) {
            deleted = comment;
            return false;
          } else {
            return true;
          }
        });

        if (!deleted) {
          reply(Boom.notFound(`Comment with Id=${request.params.id} does not exist.`));
        } else {
          fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function (err) {
            if (err) {
              throw err;
            }
            reply(comments);
          });
        }
      });
    }
  }]);

