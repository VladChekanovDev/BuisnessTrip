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
    }
});

export default Station;