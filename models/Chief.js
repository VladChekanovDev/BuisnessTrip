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
    patronymic: Sequelize.STRING,
    position: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imageURL: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    getterMethods: {
        getInitials() {
            return this.lastName + ' ' + this.firstName.substr(0,1) + '. ' + this.patronymic.substr(0,1) + '.';
        },
        getFullName() {
            return this.lastName + ' ' + this.firstName + ' ' + this.patronymic;
        }
    }
});

export default Chief;