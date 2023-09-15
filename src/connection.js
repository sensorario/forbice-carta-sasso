const retrieveSessionId = require('./session');
const createOrEnterTheRoom = require('./room');
const { config } = require('./config/config');
const { state } = require('./config/state');
const request = require('./clientrequests');

function connectonHandler(ws, req) {
  sessionId = retrieveSessionId(req, ws);

  createOrEnterTheRoom(sessionId);

  ws.send(JSON.stringify({ type: 'session_id', sessionId }));
  ws.on('close', () => {
    state.clients.delete(sessionId);
  });

  ws.on('message', request);

  setInterval(() => {
    ws.send(JSON.stringify({ type: 'counter_update', counter: state.counter }));
  }, config.interval);
}

module.exports = connectonHandler;
