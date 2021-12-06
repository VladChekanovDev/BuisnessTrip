import Sequelize from 'sequelize';

import sequelize from '../helpers/database.js';

const Station = sequelize.define('station', {
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
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    imageURL: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    getterMethods: {
        getFullAdress() {
            return this.adress + ', ' + this.name
        }
    }
});

export default Station;