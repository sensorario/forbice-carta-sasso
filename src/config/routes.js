const routes = [];

routes['/client.js'] = {
  file: './static/client.js',
  type: 'application/javascript',
};

routes['/style.css'] = {
  file: './static/style.css',
  type: 'text/css',
};

routes['/'] = {
  file: './static/client.html',
  type: 'text/html',
};

module.exports = routes;
