module.exports = (database, type) => {
    return database.define('education', {
        titleVitae: type.STRING,
        subtitle: type.STRING,
        content: type.STRING,
        dateAt: type.DATE,
        dateEnd: type.DATE
    })
};