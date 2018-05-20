const Sequelize = require('Sequelize');
const UserModel = require('../models/user');
const CurriculumVitaeModelModel = require('../models/curriculumVitae');
const EducationModel = require('../models/education');
const SkillModel = require('../models/skill');
const WorkExperienceModel = require('../models/workExperience');

const database = new Sequelize('generatecv', 'root', '', {
    host: 'localhost',
    password: null,
    dialect: 'mysql'
});

const User = UserModel(database, Sequelize);
const Vitae = CurriculumVitaeModelModel(database, Sequelize);
const Education = EducationModel(database, Sequelize);
const Skill = SkillModel(database, Sequelize);
const Work = WorkExperienceModel(database, Sequelize);

Vitae.belongsTo(User);
User.hasMany(Vitae);

Education.belongsTo(Vitae);
Work.belongsTo(Vitae);
Skill.belongsTo(Vitae);
Vitae.hasMany(Education);
Vitae.hasMany(Skill);
Vitae.hasMany(Work);

database.sync({force: false})
    .then(() => {
        console.log(`Database & tables created` +
            '\nServer Start' +
            '\n Adresse web: http://localhost:3000/' +
            '\n All config api is routes/api/controller' +
            '\n API for users: http://localhost:3000/api/users');
    });

module.exports = {
    User,
    Vitae,
    Education,
    Skill,
    Work
};