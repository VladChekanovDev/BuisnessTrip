import Sequelize from 'sequelize';

import sequelize from '../helpers/database.js';

const Admin = sequelize.define('admin', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    }
});

export default User;