module.exports = (database, type) => {
    return database.define('skill', {
        title: type.STRING,
        subtitle: type.STRING,
        content: type.STRING,
        dateAt: type.DATE,
        dateEnd: type.DATE
    })
};