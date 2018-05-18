module.exports = (database, type) => {
    return database.define('vitae', {
        title: type.STRING,
        birth: type.STRING,
        address: type.STRING,
        phone: type.STRING,
        picture: type.STRING
    })
};