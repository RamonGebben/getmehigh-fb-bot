'use strict';

const Hapi = require('hapi');

const server = new Hapi.Server();
server.connection({ port: process.env.PORT || 3000 });

server.route({
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    return reply('Ja hoor hij werkt!');
  }
});

server.route({
  method: 'GET',
  path: '/{name}',
  handler: (request, reply) => {
    return reply('Hello, ' + encodeURIComponent(request.params.name) + '!');
  }
});

server.route({
  method: 'GET',
  path: '/webhook',
  handler: (request, reply) => {
    // messaging_events = req.body.entry[0].messaging;
    //  for (i = 0; i < messaging_events.length; i++) {
    //    event = req.body.entry[0].messaging[i];
    //    sender = event.sender.id;
    //    if (event.message && event.message.text) {
    //      text = event.message.text;
    //      // Handle a text message from this sender
    //    }
    //  }
    //  res.sendStatus(200);    
    if (request.query['hub.verify_token'] === 'jemoederisdik') {
      return reply(request.query['hub.challenge']);
    }
    return reply('Error, wrong validation token');
  }
});

server.start((err) => {
  if (err) { throw err; }
  console.log('Server running at:', server.info.uri);
});
