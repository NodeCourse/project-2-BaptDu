const {User} = require('../database');
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
        User
            .sync()
            .then(function () {
                User.create(req.body);
                res.send(200)
            })
            .catch((error) => {
                res.render('500', {error: error});
            })
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

module.exports = router;
