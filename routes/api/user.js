const {User} = require('../database');
const passport = require('passport');
const bcrypt = require('bcrypt');
const router = require('express').Router();

router.route('/api/users')
    .get(function (req, res) {
        User
            .findAll()
            .then(Users => res.json(Users))
            .catch((error) => {
                res.render('500', {error: error});
            })
    })

    .post(function (req, res) {

        const username = req.body.username;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const email = req.body.email;
        const picture = req.body.picture;
        const password = req.body.password;

        if (username === null && firstName === null && lastName === null && email === null) {
            User
                .sync()
                .then(function () {
                    User.create({
                        username: username,
                        firstName: firstName,
                        lastName: lastName,
                        email: email,
                        picture: picture,
                        password: password
                    });
                    res.redirect("/");
                    res.send(200)
                })
                .catch((error) => {
                    res.render('500', {error: error});
                })
        }else {
            res.redirect('/')
        }
    });

router.route('/api/users/:id')
    .get(function (req, res) {
        User
            .findById(req.params.id)
            .then(User => res.json(User))
            .catch((error) => {
                res.render('500', {error: error});
            })
    });

router.post('/login',
    passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/profile'
    }));

module.exports = router;
