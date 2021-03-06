import md5 from "md5";

import User from "../models/User.js";
import Chief from "../models/Chief.js";
import Department from "../models/Department.js";
import Worker from "../models/Worker.js";
import Station from "../models/Station.js";

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
    const userId = req.body.userId;Понял
    
    const description = req.body.description;
    const imageURL = req.body.imageURL;
    await Department.create({
        name: name,
        adress: adress,
        imageURL: imageURL,
        description: description
    });
    res.redirect(`/admin/${userId}/departments`);
};

export const postDeleteDepartment = async(req, res) => {
    const userId = req.body.userId;
    const departmentId = req.body.departmentId;
    const department = await Department.findByPk(departmentId);
    await department.destroy();
    res.redirect(`/admin/${userId}/departments`);
};

export const getEditDepartment = async(req, res) => {
    const userId = req.params.userId;
    const departmentId = req.params.departmentId;
    const department = await Department.findByPk(departmentId);
    res.render('admin/edit-department', {
        pageTitle: 'Редактирование информации об отдела',
        department: department,
        userId: userId
    })
};

export const postEditDepartment = async(req, res) => {
    const userId = req.body.userId;
    const updatedDepartment = {
        name: req.body.name,
        adress: req.body.adress,
        description: req.body.description,
        imageURL: req.body.imageURL
    };
    await Department.update(updatedDepartment, {
        where: {
            id: req.body.departmentId
        }
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
    let departments = await Department.findAll();
    departments.forEach(d => console.log(d));
    res.render('admin/add-chief', {
        pageTitle: 'Добавление начальника отдела',
        departments: departments,
        userId: userId
    });
};

export const postAddChief = async(req, res, next) => {
    try {
        const userId = req.body.userId;
        const firstName = req.body.firstName;
        const lastName = req.body.lastName;
        const patronymic = req.body.patronymic;
        const login = req.body.login;
        const password = md5(req.body.password);
        const departmentId = req.body.departmentId;
        const position = req.body.position;
        const imageURL = req.body.imageURL;
        await User.registrateChief({
            login: login,
            password: password,
            userType: 'chief',
        }, {
            firstName: firstName,
            lastName: lastName,
            patronymic: patronymic,
            position: position,
            imageURL: imageURL
        }, departmentId);
        res.redirect(`/admin/${userId}/chiefs`);   
    } catch(e) {
        console.log(e);
        res.redirect('/error/500');
    }
};

export const postDeleteChief = async(req, res) => {
    const userId = req.body.userId;
    const chiefId = req.body.chiefId;
    const chief = await Chief.findByPk(chiefId);
    const user = await chief.getUser();
    await user.destroy();
    res.redirect(`/admin/${userId}/chiefs`);
};

export const getEditChief = async(req, res) => {
    const userId = req.params.userId;
    const chiefId = req.params.chiefId;
    const chief = await Chief.findByPk(chiefId);
    const departments = await Department.findAll(); 
    res.render('admin/edit-chief', {
        pageTitle: 'Редактирование начальника',
        userId: userId,
        chief: chief,
        departments: departments
    })
};

export const postEditChief = async(req, res) => {
    const userId = req.body.userId;
    const chiefId = req.body.chiefId;
    const updatedChief = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        patronymic: req.body.patronymic,
        departmentId: req.body.departmentId,
        position: req.body.position
    };
    await Chief.update(updatedChief, {
        where: {
            id: chiefId
        }
    });
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
        const password = md5(req.body.password);
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

export const postDeleteWorker = async(req, res) => {
    const userId = req.body.userId;
    const workerId = req.body.workerId;
    const worker = await Worker.findByPk(workerId);
    await worker.destroy();
    res.redirect(`/admin/${userId}/workers`);
}

export const getEditWorker = async(req, res) => {
    const userId = req.params.userId;
    const workerId = req.params.workerId;
    const worker = await Worker.findByPk(workerId);
    const workerUser = await worker.getUser();
    const departments = await Department.findAll();
    const user = await User.findByPk(userId);
    res.render('admin/edit-worker', {
        pageTitle: 'Редактирование рабочего',
        worker: worker,
        userId: userId,
        departments: departments,
        user: workerUser
    });
};

export const postEditWorker = async(req, res) => {
    try {
        const userId = req.body.userId;
        const workerId = req.body.workerId;
        const updatedWorker = {
            lastName: req.body.lastName,
            firstName: req.body.firstName,
            patronymic: req.body.patronymic,
            dateOfBirth: req.body.dateOfBirth,
            dateOfHiring: req.body.dateOfHiring,
            departmentId: req.body.departmentId,
            position: req.body.position,
            salary: req.body.salary,
            imageURL: req.body.imageURL
        };
        await Worker.update(updatedWorker, {
            where: {
                id: workerId
            }
        });
        res.redirect(`/admin/${userId}/workers`);
    } catch(e) {
        console.log(e);
        res.redirect('/error/500');
    }
};

export const postFireWorker = async(req, res) => {
    const workerId = req.body.workerId;
    const userId = req.body.userId;
    let today = new Date();
    let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    await Worker.update({
        dateOfDismissal: date
    }, {
        where: {
            id: workerId
        }
    });
    res.redirect(`/admin/${userId}/workers`);
};

export const getStations = async(req, res) => {
    const userId = req.params.userId;
    const stations = await Station.findAll();
    res.render('admin/stations', {
        pageTitle: 'Точки назначения',
        stations: stations,
        userId: userId
    })
};

export const getAddStation = (req, res) => {
    const userId = req.params.userId;
    res.render('admin/add-station', {
        pageTitle: 'Добавление точки назначения',
        userId: userId
    })
};

export const postAddStation = async(req, res) => {
    try {
        const userId = req.body.userId
        const newStation = {
            name: req.body.name,
            adress: req.body.adress,
            imageURL: req.body.imageURL,
            description: req.body.description
        };
        await Station.create(newStation);
        res.redirect(`/admin/${userId}/stations`);
    } catch(e) {
        res.redirect('/error/500');
    }
};

export const postDeleteStation = async(req, res) => {
    try {
        const userId = req.body.userId;
        const stationId = req.body.stationId;
        Station.destroy({
            where: {
                id: stationId
            }
        });
        res.redirect(`/admin/${userId}/stations`);
    } catch(e) {
        console.log(e);
        res.redirect('/error/500');
    }
};

export const getEditStation = async(req, res) => {
    try {
        const userId = req.params.userId;
        const stationId = req.params.stationId;
        const station = await Station.findByPk(stationId);
        res.render('admin/edit-station', {
            userId: userId,
            pageTitle: 'Редактирование точки назначения',
            station: station
        })
    } catch(e) {
        console.log(e);
        res.redirect('/error/500');
    }
};

export const postEditStation = async(req, res) => {
    try {
        const userId = req.body.userId;
        const stationId = req.body.stationId;
        const imageURL = req.body.imageURL;
        const description = req.body.description
        const updatedStation = {
            name: req.body.name,
            adress: req.body.adress,
            imageURL: imageURL,
            description: description
        };
        Station.update(updatedStation, {
            where: {
                id: stationId
            }
        });
        res.redirect(`/admin/${userId}/stations`);
    } catch(e) {
        console.log(e);
        res.redirect('/error/500');
    }
};