import Sequelize from 'sequelize';

import sequelize from '../helpers/database.js';

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userType: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

User.authorizate = async(login, password) => {
    const users = await User.findAll({
        where: {
            login: login
        }
    });
    if (!users[0]) return;
    if (users[0].password == password) return users[0];
    return;
};

export default User;