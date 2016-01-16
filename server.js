const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const Poll = require('./poll');
const PollCreator = require('./pollCreator');

var pollCreator = new PollCreator;

var hbars = require('express-handlebars');
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 3000;
server.listen(PORT, function() {
  console.log("Server is up and running on port: " + PORT)
});

app.engine('handlebars', hbars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(request, response) {
  response.render('index');
});

app.post('/', function(request, response) {
  var poll = pollCreator.create(request.body);
  response.redirect('/' + poll.dashboard_url);
});

app.get('/dashboard/:id', function(request, response) {
  console.log(pollCreator.poll);
  response.render('dashboard', {
    poll: pollCreator.poll
  });
});

io.on('connection', function (socket) {
  console.log('Someone has connected.');
});
