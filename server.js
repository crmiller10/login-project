const express = require('express');
const mustache = require('mustache-express');
const bodyparser = require('body-parser');
const session = require('express-session');

const server = express();

const login = [
  { username: 'john', password: '1234', logins: 0 },
  { username: 'bill', password: 'password', logins: 0 },
  { username: 'amy', password: '0000', logins: 0 },
];

const messages = [];

// Configure express to use mustache and get some defaults
server.engine('mustache', mustache());
server.set('views', './views'); //Where to look for template
server.set('view engine','mustache'); //What do we use to render the

server.use(bodyparser.urlencoded({extended: false}));
server.use(session({
    secret: '98rncailevn-_DT83FZ@', // TODO: LUKE DONT FORGET
    resave: false,
    saveUninitialized: true
}));
// Display a form
// Load the index mustache template and populate
// from the object
server.get('/', function (req, res) {
  res.render('login');
});

server.get('/home', function (req, res) {
  if (req.session.who !== undefined){
    res.render('home', {
      username: req.session.who.username,
      loginCount: req.session.who.logins,
      messages: messages,
    });
  } else {
    res.redirect('/');
  }
});


server.post('/login', function (req, res) {

  let user = null;

  for (let i = 0; i < login.length; i++) {

    if ( req.body.username === login[i].username &&
        req.body.password === login[i].password) {
        user = login[i];
      }
   }
   if (user !== null) {
    req.session.who = user;
    req.session.who.logins;

    res.redirect('/home');

   } else {
      res.redirect('/');
    }
});

// TODO: Receive from info
server.listen(3000, function() {
  console.log('Login info received');
});
