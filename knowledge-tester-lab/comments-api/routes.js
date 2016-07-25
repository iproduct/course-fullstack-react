const handlers = require('./handlers');
const Joi = require('Joi');

module.exports = [{
  method: 'GET',
  path: '/api/comments',
  handler: handlers.findAll
},
  {
    method: 'POST',
    path: '/api/comments',
    handler: handlers.create,
     config: {
      validate: {
        payload: Joi.object({
          id: Joi.string().min(1).optional(),
          author: Joi.string().min(2).required(),
          text: Joi.string().required(),
        })
      }
    }
  },
  {
    method: 'DELETE',
    path: '/api/comments/{commentId}',
    handler: handlers.remove,
    config: {
      validate: {
        params: {
          commentId: Joi.string().length(24).required()
        }
      }
    }
  }];