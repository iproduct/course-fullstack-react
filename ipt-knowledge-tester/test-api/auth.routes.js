/**
 * This file provided by IPT-Intellectual Products & Technologies (IPT)
 * is for non-commercial usering and evaluation purposes only. 
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

const Joi = require('joi');
const Auth = require('./auth.handlers');

const loginSchema = Joi.object({
  email: Joi.string().email().min(8).max(80).required(),
  password: Joi.string().min(8).max(30).required(),
});

module.exports = [{
  method: 'POST',
  path: '/api/login',
  config: {
    payload: {
      output: 'data',
      parse: true
    },
    validate: {
      payload: loginSchema
    }
  },
  handler: Auth.login
},
  // {
  //   method: ['GET', 'POST'],
  //   path: '/api/users/{userId}',
  //   handler: Users.find,
  //   config: {
  //     validate: {
  //       params: {
  //         userId: Joi.string().length(24).required()
  //       }
  //     }
  //   }
  // },
  // {
  //   method: 'POST',
  //   path: '/api/users',
  //   handler: Users.create,
  //   config: {
  //     validate: {
  //       payload: userSchema
  //     }
  //   }
  // },
  // {
  //   method: 'PUT',
  //   path: '/api/users/{userId}',
  //   handler: Users.edit,
  //   config: {
  //     validate: {
  //       params: {
  //         userId: Joi.string().length(24).required()
  //       },
  //       payload: userSchema
  //     }
  //   }
  // },
  // {
  //   method: 'DELETE',
  //   path: '/api/users/{userId}',
  //   handler: Users.remove,
  //   config: {
  //     validate: {
  //       params: {
  //         userId: Joi.string().length(24).required()
  //       }
  //     }
  //   }
  // },
  {
    // GET to http://localhost:8080/tokenRequired
    // with authorization in the request headers set to Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhY2NvdW50SWQiOjEyMywiaWF0IjoxMzkyNTg2NzgwfQ.nZT1lsYoJvudjEYodUdgPR-32NNHk7uSnIHeIHY5se0
    // That is, the text 'Bearer ' + the token.
    method: 'GET',
    path: '/api/withToken',
    config: { auth: 'token' },
    handler: function (request, reply) {
      var replyObj = { text: 'I am a JSON response, and you needed a token to get me.', credentials: request.auth.credentials };
      reply(replyObj);
    }
  }];