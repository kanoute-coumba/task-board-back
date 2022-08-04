const http = require ('http');
const app = require('./app');
app.set('port', process.env.PORT || 3000);

// const server = http.createServer((req, res) => {
//     res.end('Voilà la réponse du premier serveur');
// });
const server = http.createServer(app)
server.listen(process.nextTick.PORT || 3000);
