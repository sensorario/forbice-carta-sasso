const http = require('http');
const fs = require('fs');
const routes = require('./config/routes');

function app() {
  const server = http.createServer((req, res) => {
    if (!routes.hasOwnProperty(req.url)) {
      res.writeHead(404);
      return res.end(`Url ${req.url} non valido.`);
    }

    const route = routes[req.url];
    fs.readFile(route.file, (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end(`Errore durante la lettura del file ${route.file}.`);
      }

      res.writeHead(200, { 'Content-Type': route.type });
      res.end(data);
    });
  });

  return server;
}

module.exports = app;
