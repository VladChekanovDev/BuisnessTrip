import User from "../models/User.js";
import Chief from "../models/Chief.js";
import Department from "../models/Department.js";
import Worker from "../models/Worker.js";

export const getAdmin = (req, res, next) => {
    const userId = req.params.userId;
    res.render('admin/admin', {
        pageTitle: 'Панель администратора',
        userId: userId
    });
};

export const getDepartments = async(req, res, next) => {
    const userId = req.params.userId;
    const departments = await Department.findAll();
    res.render('admin/departments', {
        pageTitle: 'Отделы',
        departments: departments,
        userId: userId
    });
};

export const getAddDepartment = (req, res, next) => {
    const userId = req.params.userId;
    res.render('admin/add-department', {
        pageTitle: 'Добавление отдела',
        userId: userId
    });
};

export const postAddDepartment = async(req, res, next) => {
    const name = req.body.name;
    const adress = req.body.adress;
    const userId = req.body.userId;
    await Department.create({
        name: name,
        adress: adress
    });
    res.redirect(`/admin/${userId}/departments`);
};

export const getChiefs = async(req, res, next) => {
    const userId = req.params.userId;
    const chiefs = await Chief.findAll();
    for (let chief of chiefs) {
        chief.department = await chief.getDepartment();
    }
    res.render('admin/chiefs', {
        pageTitle: 'Начальники отделов',
        chiefs: chiefs,
        userId: userId
    });
};

export const getAddChief = async(req, res, next) => {
    const userId = req.params.userId;
    const departments = await Department.findAll();
    res.render('admin/add-chief', {
        pageTitle: 'Добавление начальника отдела',
        departments: departments,
        userId: userId
    });
};

export const postAddChief = async(req, res, next) => {
    const userId = req.body.userId;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const patronymic = req.body.patronymic;
    const login = req.body.login;
    const password = req.body.password;
    const departmentId = req.body.departmentId;
    await User.registrateChief({
        login: login,
        password: password,
        userType: 'chief',
    }, {
        firstName: firstName,
        lastName: lastName,
        patronymic: patronymic
    }, departmentId);
    res.redirect(`/admin/${userId}/chiefs`);   
};

export const getWorkers = async(req, res, next) => {
    const userId = req.params.userId;
    const workers = await Worker.findAll();
    for (let worker of workers) {
        worker.department = await worker.getDepartment();
    }
    res.render('admin/workers', {
        pageTitle: 'Работники',
        workers: workers,
        userId: userId
    });
};

export const getAddWorker = async(req, res, next) => {
    const userId = req.params.userId;
    const departments = await Department.findAll();
    res.render('admin/add-worker', {
        pageTitle: 'Добавление работника',
        departments: departments,
        userId: userId
    });
};

export const postAddWorker = async(req, res, next) => {
    try {
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const patronymic = req.body.patronymic;
        const dateOfBirth = req.body.dateOfBirth;
        const dateOfHiring = req.body.dateOfHiring;
        const login = req.body.login;
        const password = req.body.password;
        const departmentId = req.body.departmentId;
        const position = req.body.position;
        const imageURL = req.body.imageURL;
        const salary = req.body.salary;
        const userId = req.body.userId;
        await User.registrateWorker({
            login: login,
            password: password,
            userType: 'worker'
        },{
            firstName: firstName,
            lastName: lastName,
            patronymic: patronymic,
            dateOfBirth: dateOfBirth,
            dateOfHiring: dateOfHiring,
            position: position,
            imageURL: imageURL,
            salary: salary
        }, departmentId);
        res.redirect(`/admin/${userId}/workers`);
    } catch(e) {
        console.log(e);
        res.redirect('/error/500');
    }
};