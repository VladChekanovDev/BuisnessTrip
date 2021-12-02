import User from "../models/User.js";
import Chief from "../models/Chief.js";

export const getAdmin = (req, res, next) => {
    res.render('admin/admin', {
        pageTitle: 'Панель администратора'
    });
}

export const getChiefs = async(req, res, next) => {
    const chiefs = await Chief.findAll();
    res.render('admin/chiefs', {
        pageTitle: 'Начальники отделов',
        chiefs: chiefs
    })
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
}