const { allowedClientRequestType, type } = require('./config/config');
const { state } = require('./config/state');

function request(msg) {
  const message = JSON.parse(msg);
  if (!allowedClientRequestType.includes(message.type)) {
    throw `unexpected message type: ${message.type}`;
  }

  if (message.type === type.choice) {
    console.log(message);
    state.games[message.roomId].turn[message.sessionId] = message.value;
    console.log(JSON.stringify(state.games[message.roomId].turn));
  }
}

module.exports = request;
