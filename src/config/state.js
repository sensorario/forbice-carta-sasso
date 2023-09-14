const { statuses } = require('./config');

const state = {
  games: {
    // players: ['aaa':'bbb'],
    // turns: ['aaa','bbb','bbb'],
    // turn: { aaa: null, bbb: null}
  },
  counter: 0,
  stanza: null,
  clients: new Map(),
  status: statuses.idle,
};

module.exports = {
  state,
};
