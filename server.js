const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const APIUser = require('./routes/api/user');
const passport = require('passport');
const port = process.env.PORT || 3000;



app.set('view engine', 'pug');

app.use(express.static('public'));
require('./config/passport');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());


app.use(APIUser);

app.get('/', (req, res) => {
    res.render('home')
});


















app.listen(port);