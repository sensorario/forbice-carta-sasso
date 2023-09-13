const { state } = require('./config/state');
const randomId = require('./random');

function retrieveSessionId(request, ws) {
  const wsUrl = request.url;
  const urlParams = new URLSearchParams(wsUrl);
  id = urlParams.get('/?sessionId');
  sessionId = id ? id : randomId();
  state.clients.set(sessionId, ws);
  return sessionId;
}

module.exports = retrieveSessionId;
