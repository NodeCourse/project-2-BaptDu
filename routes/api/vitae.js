const {Vitae, User} = require('../database');
const router = require('express').Router();

router.route('/api/curriculumVitaes')
    .get(function (req, res) {
        Vitae
            .findAll()
            .then(Vitaes => res.json(Vitaes))
            .catch((error) => {
                res.render('500', {error: error});
            })
    })

    .post(function (req, res) {

        Vitae
            .sync()
            .then(function () {
                Vitae.create({
                    title: req.body.title,
                    nameFirst: req.body.nameFirst,
                    nameLast: req.body.nameLast,
                    birth: req.body.birth,
                    address: req.body.address,
                    phone: req.body.phone,
                    nameEmail:req.body.nameEmail,
                    picture: req.body.picture,
                    userId: req.user.id
                });
                res.send(200);
            })
            .catch((error) => {
                res.render('errors/500', {error: error});
            })

    });


module.exports = router;