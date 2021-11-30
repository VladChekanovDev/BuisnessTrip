import Sequelize from 'sequelize';

const sequelize = new Sequelize('buisnesstripdb', 'root', '50580011092002vladislav', {
    host: 'localhost',
    dialect: 'mysql'
});

export default sequelize;