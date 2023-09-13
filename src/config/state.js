const { statuses } = require('./config');

const state = {
  games: {},
  counter: 0,
  stanza: null,
  clients: new Map(),
  status: statuses.idle,
};

module.exports = {
  state,
};
