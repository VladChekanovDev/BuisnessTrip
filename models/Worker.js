import Sequelize from 'sequelize';

import sequelize from '../helpers/database.js';

const Worker = sequelize.define('worker', {
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
    patronymic: Sequelize.STRING,
    dateOfBirth: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    dateOfHiring: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    dateOfDismissal: Sequelize.DATEONLY,
    position: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imageURL: Sequelize.STRING,
    salary: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

export default Worker;