const activeGameElement = document.getElementById('active_game');
const finishedGameElement = document.getElementById('finished_game');
const winnerElement = document.getElementById('winer');

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

    const counts = {};
    room.turns.forEach((turn) => {
      if (turn === '') return;
      counts[turn] = (counts[turn] || 0) + 1;
    });

    console.log('and the winner is, ...');
    let winnerIs = '';
    if (counts[room.players[0]] === counts[room.players[1]]) winnerIs = 'pari';
    else if (counts[room.players[1]] === undefined || counts[room.players[0]] > counts[room.players[1]])
      winnerIs = `ha vinto "${room.players[0]}"`;
    else winnerIs = `ha vinto "${room.players[1]}"`;

    activeGameElement.style.visibility = 'hidden';
    finishedGameElement.style.visibility = 'visible';
    winnerElement.innerHTML = winnerIs;
    setButtonsVisibility('hidden');
  }

  if (data.type === 'newturn') {
    room = data.room;
    roomId = data.roomId;
    roomIdElement.textContent = 'roomId: ' + roomId;
    const turno = room.turns.length + 1;
    turn.textContent = 'turno ' + turno;
    setButtonsVisibility('visible');

    turnsElement.innerHTML = '';
    room.turns.forEach((turn) => {
      if (turn === '') return;
      const element = document.createElement('li');
      element.textContent = turn;
      turnsElement.appendChild(element);
    });
  }
};
