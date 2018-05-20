module.exports = (database, type) => {
    return database.define('skill', {
        titleSkill: type.STRING,
        subtitleSkill: type.STRING,
        contentSkill: type.STRING,
        dateAtSkill: type.DATE,
        dateEndSkill: type.DATE
    })
};