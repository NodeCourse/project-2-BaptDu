module.exports = (database, type) => {
    return database.define('education', {
        titleEduc: type.STRING,
        subtitleEduc: type.STRING,
        contentEduc: type.STRING,
        dateAtEduc: type.DATE,
        dateEndEduc: type.DATE
    })
};