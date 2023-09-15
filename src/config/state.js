function buildRoom(sessionId) {
  return {
    players: [state.stanza, sessionId],
    turns: [],
    turn: {
      [state.stanza]: null,
      [sessionId]: null,
    },
  };
}

const state = {
  games: {
    // players: ['aaa':'bbb'],
    // turns: ['aaa','bbb','bbb'],
    // turn: { aaa: null, bbb: null}
  },
  counter: 0,
  stanza: null,
  clients: new Map(),
};

module.exports = {
  state,
  buildRoom,
};
