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
}, {
    getterMethods: {
        getFullName() {
            return this.lastName + ' ' + this.firstName + ' ' + this.patronymic;
        },
        getInitials() {
            if (this.firstName && this.patronymic)
                return this.lastName + ' ' + this.firstName.substr(0,1) + '. ' + this.patronymic.substr(0,1) + '.';
            return;
        }
    }
});

export default Worker;