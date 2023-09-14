const newturn = require('./newturn');
const { statuses } = require('./config/config');
const { state } = require('./config/state');
const randomId = require('./random');

function createOrEnterTheRoom(sessionId) {
  if (state.stanza == null) {
    state.stanza = sessionId;
  } else {
    const roomId = randomId();
    state.games[roomId] = {
      players: [state.stanza, sessionId],
      turns: [],
      turn: {
        [state.stanza]: null,
        [sessionId]: null,
      },
    };

    newturn(state.stanza, sessionId, state.games[roomId], roomId);

    state.stanza = null;
    state.status = statuses.engaged;
  }
}

module.exports = createOrEnterTheRoom;
