module.exports = (database, type) => {
    return database.define('user', {
        username: type.STRING,
        email: type.STRING,
        picture: type.STRING,
        password: type.STRING
    })
};