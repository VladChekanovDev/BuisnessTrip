import Sequelize from 'sequelize';

import sequelize from '../helpers/database.js';

import Chief from '../models/Chief.js';
import Department from './Department.js';
import Worker from './Worker.js';

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
    console.log(login, password);
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
 * 
 * Registrates chief
 * @param {*} chiefObject Объект начальника
 * @param {*} userObject Объект пользователя
 * @param {*} departmentId Department's id
 */
User.registrateChief = async(userObject, chiefObject, departmentId) => {
    const user = await User.create(userObject);
    const chief = await Chief.create(chiefObject);
    await user.setChief(chief);
    const department = await Department.findByPk(departmentId);
    await chief.setDepartment(department);
};

/**
 * Registares worker
 * @param {*} userObject User's object 
 * @param {*} workerObject Worker's object 
 * @param {*} departmentId Department's id
 */
User.registrateWorker = async(userObject, workerObject, departmentId) => {
    const user = await User.create(userObject);
    const worker = await Worker.create(workerObject);
    const department = await Department.findByPk(departmentId);
    await department.addWorker(worker);
    await user.setWorker(worker);
}

export default User;