import Sequelize from 'sequelize';

import sequelize from '../helpers/database.js';

import Chief from '../models/Chief.js';

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

/**
 * Authorizates user
 * @param {*} login Login
 * @param {*} password Password
 * @returns User's instance or nothing
 */
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

/**
 * Registrates chief
 * @param {*} chiefObject Объект начальника
 * @param {*} userObject Объект пользователя
 */
User.registrateChief = async(userObject, chiefObject, departmentId) => {
    const user = await User.create(userObject);
    const chief = await Chief.create(chiefObject);
    chief.deparmentId = departmentId;
    user.setChief(chief);
}

export default User;