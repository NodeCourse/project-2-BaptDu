const {User, Vitae, Work, Skill,Education} = require('../database');
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

        // if (username !== username && firstName !== firstName && lastName !== lastName && email !== email) {

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
                    res.redirect('/profile/' + req.user.id);
                })
                .catch((error) => {
                    res.render('500', {error: error});
                })

        // } else {
        //
        //     return res.send('Les informations suivantes sont déjà dans notre base de donnée')
        // }
    });

router.route('/api/user/:id')
    .get(function (req, res) {
        User
            .findById(req.params.id, {include: [Vitae]})
            .then(User => res.json(User))
            .catch((error) => {
                res.render('500', {error: error});
            })
    });

router.post('/login',
    passport.authenticate('local', {
        failureRedirect: '/login',
        successRedirect: '/'
    }));

router.route('/api/user/:userId/:vitaeId')
    .get(function (req, res) {
        Vitae
            .findById(req.params.vitaeId, {include: [Work,Skill,Education]})
            .then(Vitae => res.json(Vitae));
        User
            .findById(req.params.userId)
            .catch((error) => {
                res.render('500', {error: error});
            })


    });

router.route('/api/user/:userId/:vitaeId/educations')
    .post(function (req, res) {
        Education
            .sync()
            .then(function () {
                Education.create({
                    titleVitae: req.body.titleVitae,
                    subtitle: req.body.subtitle,
                    content: req.body.content,
                    dateAt: req.body.dateAt,
                    dateEnd: req.body.dateEnd,
                    userId: req.params.userId,
                    vitaeId: req.params.vitaeId
                });
                res.redirect('/');
            })
            .catch((error) => {
                res.render('500', {error: error});
            })
    });

module.exports = router;
