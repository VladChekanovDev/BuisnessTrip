import Sequelize from 'sequelize';

import sequelize from '../helpers/database.js';

const Department = sequelize.define('department', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    adress: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

export default Department;