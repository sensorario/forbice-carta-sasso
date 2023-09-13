const WebSocket = require('ws');
const { state } = require('./config/state');

function sendMessageToClient(message) {
  const client = state.clients.get(message.to);
  if (client && client.readyState === WebSocket.OPEN) {
    client.send(JSON.stringify(message.data));
  }
}

function handshake(first, second, room, roomId) {
  sendMessageToClient({
    to: first,
    data: { type: 'handshake', opponent: second, room: room, roomId: roomId },
  });
  sendMessageToClient({
    to: second,
    data: { type: 'handshake', opponent: first, room: room, roomId: roomId },
  });
}

module.exports = handshake;
