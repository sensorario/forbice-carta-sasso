const newturn = require('./newturn');
const { statuses } = require('./config/config');
const { state, buildRoom } = require('./config/state');
const randomId = require('./random');

function createOrEnterTheRoom(sessionId) {
  if (state.stanza == null) {
    state.stanza = sessionId;
  } else {
    const roomId = randomId();
    state.games[roomId] = buildRoom(sessionId);

    newturn(state.stanza, sessionId, state.games[roomId], roomId);

    state.stanza = null;
    state.status = statuses.engaged;
  }
}

module.exports = createOrEnterTheRoom;
