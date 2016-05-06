'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: 3000 });

server.route({
  method: 'GET',
  path: '/',
  handler: function (request, reply) {
    reply('Ja hoor hij werkt!');
  }
});

server.route({
  method: 'GET',
  path: '/{name}',
  handler: function (request, reply) {
    reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
  }
});

server.route({
  method: 'GET',
  path: '/webhook',
  handler: function (request, reply) {
    if (request.query['hub.verify_token'] === 'jemoederisdik') {
      reply(request.query['hub.challenge']);
    }
    reply('Error, wrong validation token');
  }
});

server.start((err) => {
  if (err) { throw err; }
  console.log('Server running at:', server.info.uri);
});
