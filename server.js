const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const APIUser = require('./routes/api/user');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const COOKIE_SECRET = 'cookie secret';
const port = process.env.PORT || 3000;

require('./config/passport');

app.set('view engine', 'pug');

app.use(express.static('public'));
app.use(cookieParser(COOKIE_SECRET));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(session({
    secret: COOKIE_SECRET,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());


app.use(APIUser);

//Page d'accueil
app.get('/', (req, res) => {
    res.render('home',{title: 'Accueil - CVG', user: req.user})
});

//Gestion des utilisateurs
app.get('/profile', (req, res) => {
    res.render('profile', {title: 'Espace Membre- CVG', user: req.user})
});

app.get('/login', (req, res) => {
    res.render('login', {title: 'Mon Espace Membre- CVG'})
});

app.get('/register', (req, res) => {
    res.render('register', {title: 'Nouveau client - CVG'})
});

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});
















app.listen(port);