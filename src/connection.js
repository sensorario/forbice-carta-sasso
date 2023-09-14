const retrieveSessionId = require('./session');
const createOrEnterTheRoom = require('./room');
const { statuses, config } = require('./config/config');
const { state } = require('./config/state');
const request = require('./clientrequests');

function connectonHandler(ws, req) {
  sessionId = retrieveSessionId(req, ws);

  if (state.status == statuses.idle) createOrEnterTheRoom(sessionId);
  else console.log('gioco gia iniziato');

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
