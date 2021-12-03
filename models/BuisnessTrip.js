import Sequelize from 'sequelize';

import sequelize from '../helpers/database.js';

const BuisnessTrip = sequelize.define('buisnessTrip', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }, 
    dateOfBegin: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    duration: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    goal: {
        type: Sequelize.STRING,
        allowNull: false
    },
    orderNumber: {
        type: Sequelize.STRING,
        allowNull: false
    },
    orderDate: {
        type: Sequelize.DATEONLY,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    cost: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
});

export default BuisnessTrip;