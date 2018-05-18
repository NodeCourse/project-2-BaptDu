const Sequelize = require('Sequelize');
const UserModel = require('../models/user');

const database = new Sequelize('GenerateCV', 'root', '', {
    host: 'localhost',
    password: null,
    dialect: 'mysql'
});

const User = UserModel(database, Sequelize);

database.sync({force: false})
    .then(() => {
        console.log(`Database & tables created` +
            '\nServer Start' +
            '\n Adresse web: http://localhost:3000/' +
            '\n All config api is routes/api/controller' +
            '\n API for users: http://localhost:3000/api/users');
    });

module.exports = {
    User
};