//Import Libs
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const infoJson = require('./data/info.json');
const angelsJson = require('./data/angels.json');
const homeJson = require('./data/home.json');
const loginsJson = require('./data/logins.json');
const sendmail = require('sendmail')();

const app = express();

//Handlebars
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//MIDDLEWARES
//Express serve static files from assets folder
app.use(express.static('assets'))
//Parse application
app.use(bodyParser.urlencoded({
  extended: false
}))
//Express Session
app.use(session({
  secret: 'bla bla bla cat',
  cookie: {
    maxAge: 60000
  }
}))


//Routes
app.get('/', (req, res) => {
  res.render('home', {
    homeActive: true,
    home: homeJson
  });
});
app.get('/shows', (req, res) => {
  res.render('shows', {
    showsActive: true,
    show: infoJson
  });
});
app.post('/angels', (req, res) => {

  let nomeForm = req.body.email;
  let passForm = req.body.password;

  for (login of loginsJson) {
    if (nomeForm !== login.email && passForm !== login.password) {
      console.log('Ops');
    } else {
      return res.redirect('/angels-protected');
    }
  }


});
app.get('/angels', (req, res) => {

  for (login of loginsJson) {
    console.log(login.email);
  }
  res.render('angels');
});
app.get('/angels-protected', (req, res) => {

  // if (req.session.email) {
  //   res.render('angels-protected');
  // } else {
  //   res.redirect('/angels');
  // }

  res.render('angels-protected', {
    angelsActive: true,
    angels: angelsJson
  });
});
app.get('/contact', (req, res) => {
  res.render('contact', {
    contactActive: true
  });
});

app.post('/contact', (req, res) => {
  console.log(req.body);
  res.render('contact');
  sendmail({
    from: 'renan.sigolo@gmail.com',
    to: 'renan.sigolo@gmail.com',
    subject: 'Test sendmail',
    html: 'Mail of test sendmail ',
  }, function(err, reply) {
    console.log(err && err.stack);
    console.dir(reply);
  });
});



app.listen(3000, () => {
  console.log('Victoria is listening you on port 3000!')
})
