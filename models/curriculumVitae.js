module.exports = (database, type) => {
    return database.define('vitae', {
        title: type.STRING,
        nameFirst: type.STRING,
        nameLast: type.STRING,
        birth: type.STRING,
        address: type.STRING,
        phone: type.STRING,
        nameEmail: type.STRING,
        picture: type.STRING
    })
};