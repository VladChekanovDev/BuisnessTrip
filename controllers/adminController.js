import User from "../models/User.js";
import Chief from "../models/Chief.js";
import Department from "../models/Department.js";

export const getAdmin = (req, res, next) => {
    res.render('admin/admin', {
        pageTitle: 'Панель администратора'
    });
};

export const getDepartments = async(req, res, next) => {
    const departments = await Department.findAll();
    res.render('admin/departments', {
        pageTitle: 'Отделы',
        departments: departments
    });
};

export const getAddDepartment = (req, res, next) => {
    res.render('admin/add-department', {
        pageTitle: 'Добавление отдела'
    });
};

export const postAddDepartment = async(req, res, next) => {
    const name = req.body.name;
    const adress = req.body.adress;
    await Department.create({
        name: name,
        adress: adress
    });
    res.redirect('/admin/departments');
};

export const getChiefs = async(req, res, next) => {
    const chiefs = await Chief.findAll();
    res.render('admin/chiefs', {
        pageTitle: 'Начальники отделов',
        chiefs: chiefs
    });
};

export const getAddChief = (req, res, next) => {
    res.render('admin/add-chief', {
        pageTitle: 'Добавление начальника отдела'
    });
};

export const postAddChief = async(req, res, next) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const patronymic = req.body.patronymic;
    const login = req.body.login;
    const password = req.body.password;
    await User.registrateChief({
        login: login,
        password: password,
        userType: 'chief'
    }, {
        firstName: firstName,
        lastName: lastName,
        patronymic: patronymic
    });
    res.redirect(`/admin/add-chief`);
};