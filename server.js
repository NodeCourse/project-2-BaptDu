const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const APIUser = require('./routes/api/user');
const APICV = require('./routes/api/vitae');
const request = require('request');
const passport = require('passport');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const COOKIE_SECRET = 'cookie secret';
const port = process.env.PORT || 3000;

require('./config/passport');
require('./config/error');

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


app.use(APIUser, APICV);

//Page d'accueil
app.get('/', (req, res) => {
    res.render('home',{title: 'Accueil - CV2.0', user: req.user})
});

//Gestion des CVs
app.get('/curriculum', (req, res) => {
    const user = req.user;

    if(!user){
        res.redirect('/register')
    }else{
        res.render('generate', {title: 'Générer son curriculum vitae - CV2.0', user})
    }
});

//Gestion des utilisateurs
app.get('/profile/:id', (req, res) => {

    request({
            url: 'http://localhost:3000/api/user/' + req.params.id
        },
        (err, response, body) => {
            if (err) {
                res.render('500', {error: err});
            } else {
                const user = JSON.parse(body);
                res.render('profile', {user});
            }
        });
});

app.get('/profile/:userId/:id', (req, res) => {

    request({
            url: 'http://localhost:3000/api/user/' + req.params.userId +'/'+ req.params.id
        },
        (err, response, body) => {
            if (err) {
                console.log(err);
                res.render('500', {error: err});
            } else {
                const user = req.user;
                const vitae = JSON.parse(body);
                res.render('curriculum', {vitae}, user);
            }
        });
});


app.get('/login', (req, res) => {
    const user = req.user;

    if(!user){
        res.render('login', {title: 'Mon Espace Membre - CV2.0'})
    }else {
        res.redirect('/profile')
    }
});

app.get('/register', (req, res) => {
    const user = req.user;

    if(!user){
        res.render('register', {title: 'Nouveau client - CV2.0'})
    }else {
        res.redirect('/profile')
    }
});

app.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});
















app.listen(port);