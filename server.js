const { config } = require('./src/config/config');
const { state } = require('./src/config/state');
const connectonHandler = require('./src/connection');
const app = require('./src/app');
const WebSocket = require('ws');
const server = app();

const wss = new WebSocket.Server({ server });
wss.on('connection', connectonHandler);

server.listen(8080, () => {
  console.log('Server in ascolto su http://localhost:8080');
});

const intervallo = setInterval(() => {
  console.log({
    counter: ++state.counter,
  });
  if (state.counter >= config.timeLimit) {
    clearInterval(intervallo);
    wss.clients.forEach((client) => {
      client.send(JSON.stringify({ type: 'end_game' }));
    });
  }
}, config.interval);
