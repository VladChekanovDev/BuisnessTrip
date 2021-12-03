import md5 from 'md5';

import User from '../models/User.js';
import Chief from "../models/Chief.js";
import Worker from "../models/Worker.js";
import Department from "../models/Department.js";
import BuisnessTrip from '../models/BuisnessTrip.js';
import Station from '../models/Station.js';

export const getChief = (req, res, next) => {
    const userId = req.params.userId;
    res.render('chief/chief', {
        pageTitle: 'Панель начальника',
        userId: userId
    });
}

export const getWorkers = async(req, res) => {
    try {
        const userId = req.params.userId;
        const user = await User.findByPk(userId);
        const chief = await user.getChief();
        const department = await chief.getDepartment(); 
        const workers = await department.getWorkers();
        res.render('chief/workers', {
            pageTitle: 'Рабочие',
            workers: workers,
            userId: userId
        });
    } catch(e) {
        console.log(e);
        res.redirect('/error/500');
    }
};

export const getAddWorker = async(req, res) => {
    const userId = req.params.userId;
    res.render('chief/add-worker', {
        pageTitle: 'Добавление рабочего',
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
        const position = req.body.position;
        const imageURL = req.body.imageURL;
        const salary = req.body.salary;
        const userId = req.body.userId;
        const user = await User.findByPk(userId);
        const chief = await user.getChief();
        const department = await chief.getDepartment();
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
        }, department.id);
        res.redirect(`/chief/${userId}/workers`);
    } catch(e) {
        console.log(e);
        res.redirect('/error/500');
    }
};

export const getBuinessTrips = async(req, res) => {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);
    const chief = await user.getChief();
    const department = await chief.getDepartment();
    console.log(user, chief, department);
    const buisnessTrips = await BuisnessTrip.findAll({
        where: {
            departmentId: department.id
        }
    });
    res.render('chief/buisness-trips', {
        pageTitle: 'Все командировки',
        buisnessTrips: buisnessTrips,
        userId: userId
    });
};

export const getAddTrip = async(req, res) => {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);
    const chief = await user.getChief();
    const department = await chief.getDepartment();
    const stations = await Station.findAll();
    const workers = await department.getWorkers();
    res.render('chief/add-trip', {
        pageTitle: 'Создание командировки',
        userId: userId,
        workers: workers,
        stations: stations
    });
};

export const postAddTrip = async(req, res) => {
    try {
        const userId = req.body.userId;
        const user = await User.findByPk(userId);
        const chief = await user.getChief();
        const department = await chief.getDepartment();
        const newTrip = {
            duration: req.body.duration,
            goal: req.body.goal,
            orderNumber: req.body.orderNumber,
            orderDate: req.body.orderDate,
            cost: req.body.cost,
            workerId: req.body.workerId,
            departmentId: department.id,
            status: 'Ожидание подтверждения работником'
        }
        const trip = await BuisnessTrip.create(newTrip);
        res.redirect(`/chief/${userId}/buisness-trips`);
    } catch(e) {
        console.log(e);
        res.redirect('/error/500');
    }
}

export const getStations = async(req, res) => {
    const userId = req.params.userId;
    const stations = await Station.findAll();
    res.render('chief/stations', {
        pageTitle: 'Точки назначения',
        stations: stations,
        userId: userId
    });
};

export const getAddStation = (req, res) => {
    const userId = req.params.userId;
    res.render('chief/add-station', {
        pageTitle: 'Добавление точки',
        userId: userId
    })
}

export const postAddStation = async(req, res) => {
    try {
        const userId = req.body.userId
        const newStation = {
            name: req.body.name,
            adress: req.body.adress
        };
        await Station.create(newStation);
        res.redirect(`/chief/${userId}/stations`);
    } catch(e) {
        res.redirect('/error/500');
    }
};

export const postDeleteStation = async(req, res) => {
    const userId = req.body.userId;
    const stationId = req.body.stationId;
    const station = await Station.findByPk(stationId);
    await station.destroy();
    res.redirect(`/chief/${userId}/stations`)
}

export const getEditStation = async(req, res) => {
    try {
        const userId = req.params.userId;
        const stationId = req.params.stationId;
        const station = await Station.findByPk(stationId);
        res.render('chief/edit-station', {
            userId: userId,
            pageTitle: 'Редактирование точки назначения',
            station: station
        })
    } catch(e) {
        console.log(e);
        res.redirect('/error/500');
    }
}

export const postEditStation = async(req, res) => {
    try {
        const userId = req.body.userId;
        const stationId = req.body.stationId;
        const updatedStation = {
            name: req.body.name,
            adress: req.body.adress
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