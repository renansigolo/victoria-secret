//Import Libs
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const infoJson = require('./data/info.json');
const angelsJson = require('./data/angels.json');
const homeJson = require('./data/home.json');
const sendmail = require('sendmail')();

const app = express();

//Handlebars
app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');

//Express serve static files from assets folder
app.use(express.static('assets'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: false
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
app.get('/angels', (req, res) => {
  res.render('angels', {
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
