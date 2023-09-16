const { allowedClientRequestType, type, wins } = require('./config/config');
const { state } = require('./config/state');
const newturn = require('./newturn');

function request(msg) {
  const message = JSON.parse(msg);
  if (!allowedClientRequestType.includes(message.type)) {
    throw `unexpected message type: ${message.type}`;
  }

  if (message.type === type.choice) {
    const room = state.games[message.roomId];
    room.turn[message.sessionId] = message.value;
    const sessions = {
      leftPlayer: [room.players][0][0],
      rightPlayer: [room.players][0][1],
    };
    if (room.turn[sessions.leftPlayer] != null && room.turn[sessions.rightPlayer] != null) {
      if (room.turn[sessions.leftPlayer] === room.turn[sessions.rightPlayer]) {
        state.games[message.roomId].turns.push('');
        console.log('pari');
      } else
        wins.forEach((combo) => {
          if (room.turn[sessions.leftPlayer] === combo.primo) {
            const winner = room.turn[sessions.rightPlayer] === combo.secondo ? sessions.leftPlayer : sessions.rightPlayer;
            state.games[message.roomId].turns.push(winner);
          }
        });

      state.games[message.roomId].turn = {
        [sessions.leftPlayer]: null,
        [sessions.rightPlayer]: null,
      };
      newturn(sessions.leftPlayer, sessions.rightPlayer, room, message.roomId);
      console.log('turno finito');
    } else {
      console.log({
        game: state.games[message.roomId].turn,
        firstPlayer: [room.players][0][0],
        lastPlayer: [room.players][0][1],
      });
    }
    console.log(JSON.stringify(state.games[message.roomId].turn));
  }
}

module.exports = request;
