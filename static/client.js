const counterElement = document.getElementById('counter');
const sessionIdElement = document.getElementById('sessionId');
const turnsElement = document.getElementById('turns');
const turn = document.getElementById('turn');
const roomIdElement = document.getElementById('roomId');
const buttons = document.querySelectorAll('.button');

let sessionId;
let room;
let roomId;

function setButtonsVisibility(visibility) {
  buttons.forEach((button) => {
    button.style.visibility = visibility;
  });
}

function getCookie(name) {
  const cookies = document.cookie.split(';');
  for (const cookie of cookies) {
    const [cookieName, cookieValue] = cookie.trim().split('=');
    if (cookieName === name) {
      return cookieValue;
    }
  }
  return null;
}

function setCookie(name, value) {
  document.cookie = `${name}=${value}; path=/`;
}

const sessionIdCookie = getCookie('sessionId');

let ws = sessionIdCookie ? new WebSocket('ws://localhost:8080?sessionId=' + sessionIdCookie) : new WebSocket('ws://localhost:8080');

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    setButtonsVisibility('hidden');
    const choice = button.getAttribute('data-choice');
    ws.send(
      JSON.stringify({
        type: 'choice',
        sessionId: sessionId,
        value: choice,
        roomId: roomId,
      }),
    );
  });
});

ws.onmessage = (event) => {
  const data = JSON.parse(event.data);

  if (data.type === 'session_id') {
    sessionId = data.sessionId;
    setCookie('sessionId', sessionId);
    sessionIdElement.textContent = `ID di sessione: ${sessionId}`;
    console.log('ID di sessione ricevuto:', sessionId);
  }

  if (data.type === 'counter_update') {
    const secondi = data.counter;
    counterElement.textContent = 'Tempo rimasto: ' + secondi + ' sec.';
  }

  if (data.type === 'end_game') {
    console.log('finito di giocare!!!');
    turnsElement.innerHTML = '';

    const counts = {};
    room.turns.forEach((turn) => {
      const element = document.createElement('li');
      element.textContent = turn;
      counts[turn] = (counts[turn] || 0) + 1;
      turnsElement.appendChild(element);
    });

    console.log('and the winner is, ...');
    if (counts[room.players[0]] === counts[room.players[1]]) console.log('pari');
    else if (counts[room.players[0]] > counts[room.players[1]]) console.log(`ha vinto "${room.players[0]}"`);
    else console.log(`ha vinto "${room.players[1]}"`);
  }

  if (data.type === 'newturn') {
    room = data.room;
    roomId = data.roomId;
    roomIdElement.textContent = 'roomId: ' + roomId;
    const turno = room.turns.length + 1;
    turn.textContent = 'turno ' + turno;
    setButtonsVisibility('visible');
  }
};
