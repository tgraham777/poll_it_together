const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const Poll = require('./poll');
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 3000;
server.listen(PORT, function() {
  console.log("Server is up and running on port: " + PORT)
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

var pollData = {};

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/public/index.html');
});

app.post('/', function(request, response) {
  var poll = new Poll(request.body);
  pollData[poll.admin_id] = poll;
  response.redirect('/' + poll.admin_url);
});

io.on('connection', function (socket) {
  console.log('Someone has connected.');
});
