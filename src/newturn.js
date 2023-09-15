const WebSocket = require('ws');
const { state } = require('./config/state');

function sendMessageToClient(message) {
  const client = state.clients.get(message.to);
  if (client && client.readyState === WebSocket.OPEN) {
    client.send(JSON.stringify(message.data));
  }
}

async function newturn(first, second, room, roomId) {
  await sendMessageToClient({
    to: first,
    data: { type: 'newturn', opponent: second, room: room, roomId: roomId },
  });
  await sendMessageToClient({
    to: second,
    data: { type: 'newturn', opponent: first, room: room, roomId: roomId },
  });
}

module.exports = newturn;
