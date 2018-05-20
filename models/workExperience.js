module.exports = (database, type) => {
    return database.define('work', {
        titleWork: type.STRING,
        subtitleWork: type.STRING,
        contentWork: type.STRING,
        dateAtWork: type.DATE,
        dateEndWork: type.DATE
    })
};