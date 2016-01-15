const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

var PORT = process.env.PORT || 3000;
http.listen(PORT, function() {
  console.log("Server is up and running on port: " + PORT)
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function (socket) {
  console.log('Someone has connected.');
});
