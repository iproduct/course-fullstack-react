var Hapi = require('hapi');

var server = new Hapi.Server('localhost', 8080);

server.route({
    method: 'GET',
    path: '/upload',
    handler: function (request, reply) {
        reply.file('clients/html-form/index.html');
        // reply.file('clients/xhr-send/index.html');
        // reply.file('clients/xhr-bootstrap/index.html');
        // reply.file('clients/jquery-widget/index.html');
    },
});

server.route({
    method: 'POST',
    path: '/submit',
    // config: { 
    //     payload: { output: 'stream' },
    //     handler: function (request, reply) {
    //         reply(request.payload);
    //     }
    // } 
    config: {
        handler: function (request, reply) {
            var body = '';
            request.payload.file.on('data', function (data) {
                body += data;
            });
            request.payload.file.on('end', function () {
                var result = {
                    description: request.payload.description,
                    file: {
                        data: body,
                        filename: request.payload.file.hapi.filename,
                        headers: request.payload.file.hapi.headers
                    }
                };
                reply(JSON.stringify(result));
            });
        },
        payload: {
            output: 'stream',
            parse: true,
            allow: 'multipart/form-data'
        }
    }
});

server.start(function () {
    console.log('Server running at: ', server.info.uri);
});
