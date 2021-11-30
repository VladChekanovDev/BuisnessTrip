import Sequelize from 'sequelize';

import sequelize from '../helpers/database.js';

const Chief = sequelize.define('chief', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false
    },
    patronymic: Sequelize.STRING
});

export default Chief;