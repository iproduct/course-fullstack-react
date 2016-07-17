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
const Hapi = require('hapi');
const Good = require('good');
const Joi = require('joi');
const Sqlite3 = require('sqlite3');

const db = new Sqlite3.Database('./comments.sqlite');

const server = new Hapi.Server();
server.connection({ port: 9000 });

//Create custom plugin
const myPlugin = {
  register: function (server, options, next) {
    server.route({
      method: 'GET',
      path: '/api/comments',
      handler: function (request, reply) {
        fs.readFile(COMMENTS_FILE, function (err, data) {
          if (err) {
            console.error(err);
            process.exit(1);
          }
          res.json(JSON.parse(data));
        });
      }
    });
    next();
  }
}

app.get('/api/comments', function (req, res) {
  fs.readFile(COMMENTS_FILE, function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});


myPlugin.register.attributes = {
  name: 'myPlugin',
  version: '1.0.0'
};


// Registering the Good plugin

server.register([{
  register: Good,
  options: {
    reporters: {
      console: [{
        module: 'good-squeeze',
        name: 'Squeeze',
        args: [{
          response: '*',
          log: '*'
        }]
      }, {
          module: 'good-console'
        }, 'stdout']
    }
  }
},
  {
    register: myPlugin,
    options: {}
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

server.route([{
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('Hello world');
  }
},
  {
    method: 'GET',
    path: '/json',
    handler: function (request, reply) {
      reply({ hello: 'world' });
    }
  },
  {
    method: 'POST',
    path: '/login',
    config: {
      handler: function (request, reply) {
        reply('login successful');
      },
      validate: {
        payload: Joi.object({
          isGuest: Joi.boolean().required(),
          username: Joi.string().when('isGuest', { is: false, then: Joi.required() }),
          password: Joi.string().alphanum(),
          accessToken: Joi.string().alphanum()
        }).options({ allowUnknown: true }).without('password', 'accessToken')
      }
    }
  }

]);









server.route([{
  method: 'GET',
  path: '/api/recipes',
  handler: function (request, reply) {

    db.all('SELECT * FROM recipes', (err, results) => {

      if (err) {
        throw err;
      }

      reply(results);
    });
  }
}]);

server.start((err) => {

  if (err) {
    throw err;
  }
  console.log('Server running at:', server.info.uri);
});

app.set('port', (process.env.PORT || 9000));

app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Additional middleware which will set headers that we need on each request.
app.use(function (req, res, next) {
  // Set permissive CORS header - this allows this server to be used only as
  // an API server in conjunction with something like webpack-dev-server.
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Disable caching so we'll always get the latest comments.
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.get('/api/comments', function (req, res) {
  fs.readFile(COMMENTS_FILE, function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    res.json(JSON.parse(data));
  });
});

app.post('/api/comments', function (req, res) {
  fs.readFile(COMMENTS_FILE, function (err, data) {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    var comments = JSON.parse(data);
    // NOTE: In a real implementation, we would likely rely on a database or
    // some other approach (e.g. UUIDs) to ensure a globally unique id. We'll
    // treat Date.now() as unique-enough for our purposes.
    var newComment = {
      id: Date.now(),
      author: req.body.author,
      text: req.body.text,
    };
    comments.push(newComment);
    fs.writeFile(COMMENTS_FILE, JSON.stringify(comments, null, 4), function (err) {
      if (err) {
        console.error(err);
        process.exit(1);
      }
      res.json(comments);
    });
  });
});


app.listen(app.get('port'), function () {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
