const newturn = require('./newturn');
const { state, buildRoom } = require('./config/state');
const randomId = require('./random');

function createOrEnterTheRoom(sessionId) {
  let newplayer = true;

  for (const roomId in state.games) {
    if (state.games[roomId].players.includes(sessionId)) {
      newturn(roomId, sessionId, state.games[roomId], roomId);
      newplayer = false;
    }
  }

  if (newplayer === true)
    if (state.stanza == null) {
      state.stanza = sessionId;
    } else {
      const roomId = randomId();
      state.games[roomId] = buildRoom(sessionId);
      newturn(state.stanza, sessionId, state.games[roomId], roomId);
      state.stanza = null;
    }
}

module.exports = createOrEnterTheRoom;
