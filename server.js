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

// setInterval(() => {
//   console.log({
//     counter: ++state.counter,
//     clients: state.clients.size,
//     games: state.games,
//   });
// }, config.interval);
