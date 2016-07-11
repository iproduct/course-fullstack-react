const Hapi = require('hapi');
const Good = require('good');
var Joi = require('joi');

let server = new Hapi.Server();
server.connection({ port: 3000 });

//Create custom plugin
const myPlugin = {

    register: function (server, options, next) {
        server.route({
            method: 'GET',
            path: '/plugin',
            handler: function (request, reply) {
                reply('Plugin added successfully');
            }
        });
        next();
    }
}

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



