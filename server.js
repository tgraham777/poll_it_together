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

  if(request.body.showPollResults === "No") {
    response.redirect('/' + poll.links_url);
  } else if(request.body.showPollResults === "Yes") {
    response.redirect('/' + poll.show_links_url);
  } else {
    console.log("You must select whether to show results on poll page or not");
  }
});

app.get('/links/:id', function(request, response) {
  console.log(pollCreator.poll);
  response.render('links', {
    poll: pollCreator.poll
  });
});

app.get('/showLinks/:id', function(request, response) {
  response.render('showLinks', {
    poll: pollCreator.poll
  });
});

app.get('/poll/:id', function(request, response) {
  response.render('pollView', {
    poll: pollCreator.poll
  });
});

app.get('/showPoll/:id', function(request, response) {
  response.render('showPollView', {
    poll: pollCreator.poll
  });
});

app.get('/admin/:id', function(request, response) {
  response.render('admin', {
    poll: pollCreator.poll
  });
});

io.on('connection', function (socket) {
  console.log('Someone has connected.');
});
