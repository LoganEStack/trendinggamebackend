var express = require('express');
var path    = require('path');
var app     = express();
var game    = require('./public/game');
const port  = process.env.PORT || 8080;

// Serve static html, js, css, and image files from the 'public' directory
app.use(express.static(path.join(__dirname,'public')));

// Create a Node.js based http server on port 8080
var server = require('http').createServer(app).listen(port, () => {
  console.log('Server started on port ' + port);
});

// Create a Socket.IO server and attach it to the http server
var io = require('socket.io').listen(server);

// Listen for Socket.IO Connections. Once connected, start the game logic.
io.sockets.on('connection', function (socket) {
  console.log('client connected');
  game.initGame(io, socket);
});
