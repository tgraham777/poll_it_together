const path = require('path');
const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const validator = require('express-validator');
const Poll = require('./poll');
const PollCreator = require('./pollCreator');
const hbars = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');

var pollCreator = new PollCreator;

var PORT = process.env.PORT || 3000;
server.listen(PORT, function() {
  console.log("Server is up and running on port: " + PORT)
});

app.engine('handlebars', hbars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(session({resave: false, saveUninitialized: false, secret: 'keyboard cat'}));
app.use(flash());
app.use(validator());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(request, response) {
  response.render('index', { messages: request.flash('error') });
});

app.post('/', function(request, response) {
  //form validation:
  request.checkBody('pollName', 'Poll name is required').notEmpty();
  request.checkBody('pollDescription', 'Poll description is required').notEmpty();
  request.checkBody('questions.question1', 'At least one question is required').notEmpty();
  request.checkBody('showPollResults', 'Response to "show results on poll page" is required').notEmpty();
  //

  var poll = pollCreator.create(request.body);
  var errors = request.validationErrors();

  if(errors) {
    for (i = 0; i < errors.length; i++) {
      request.flash('error', " " + errors[i]['msg']);
    }
    response.redirect('/');
  } else if(request.body.showPollResults === "No") {
    response.redirect('/' + poll.links_url);
  } else if(request.body.showPollResults === "Yes") {
    response.redirect('/' + poll.show_links_url);
  }
});

app.get('/links/:id', function(request, response) {
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
