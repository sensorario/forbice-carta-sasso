const counterElement = document.getElementById('counter');
const sessionIdElement = document.getElementById('sessionId');
const turnsElement = document.getElementById('turns');
const turn = document.getElementById('turn');
const actions = document.getElementById('actions');
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
    counterElement.textContent = data.counter;
  }

  if (data.type === 'newturn') {
    room = data.room;
    roomId = data.roomId;
    roomIdElement.textContent = 'roomId: ' + roomId;
    const turno = room.turns.length + 1;
    turn.textContent = 'turno ' + turno;
    if (room.turns.length > 0) {
      turnsElement.innerHTML = '';
      room.turns.forEach((turn) => {
        const element = document.createElement('li');
        element.textContent = turn;
        turnsElement.appendChild(element);
      });
    }
    setButtonsVisibility('visible');
  }
};
