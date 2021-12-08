import md5 from 'md5';

import User from '../models/User.js';
import Chief from "../models/Chief.js";
import Worker from "../models/Worker.js";
import Department from "../models/Department.js";
import BuisnessTrip from '../models/BuisnessTrip.js';
import Station from '../models/Station.js';

export const getChief = async(req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await User.findByPk(userId);
        const chief = await user.getChief();
        const department = await chief.getDepartment();
        res.render('chief/chief', {
            pageTitle: 'Панель начальника',
            userId: userId,
            chief: chief,
            department: department
        });
    } catch(e) {
        console.log(e);
    }
};

export const getChangeLogin = async(req, res) => {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);
    const chief = await user.getChief();
    res.render('chief/change-login', {
        userId: userId,
        pageTitle: 'Изменение логина',
        chief: chief
    })
};

export const getChangePassword = async(req, res) => {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);
    const chief = await user.getChief();
    res.render('chief/change-password', {
        userId: userId,
        pageTitle: 'Изменение пароля',
        chief: chief
    })
};

export const postChangePassword = async(req, res) => {
    const userId = req.body.userId;
    const chiefId = req.body.chiefId;
    const newPassword = req.body.newPassword;
    User.update({
        password: md5(newPassword) 
    }, {
        where: {
            id: userId
        }
    });
    res.redirect(`/chief/${userId}`);
};

export const postChangeLogin = async(req, res) => {
    const userId = req.body.userId;
    const chiefId = req.body.chiefId;
    const newLogin = req.body.newLogin;
    User.update({
        login: newLogin 
    }, {
        where: {
            id: userId
        }
    });
    res.redirect(`/chief/${userId}`);
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
    res.redirect(`/chief/${userId}/workers`);
};

export const postDeleteWorker = async(req, res) => {
    const workerId = req.body.workerId;
    const userId = req.body.userId;
    const worker = await Worker.findByPk(workerId);
    const userWorker = await worker.getUser();
    await userWorker.destroy();
    res.redirect(`/chief/${userId}/workers`);
}


export const getBuinessTrips = async(req, res) => {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);
    const chief = await user.getChief();
    const department = await chief.getDepartment();
    const sort = req.query.sort;
    const filter = req.query.filter;
    let buisnessTrips = await BuisnessTrip.findAll({
        where: {
            departmentId: department.id
        }
    });
    for (let buisnessTrip of buisnessTrips) {
        buisnessTrip.station = await buisnessTrip.getStation();
        buisnessTrip.worker = await buisnessTrip.getWorker();
    }
    switch(sort) {
        case 'name': 
            buisnessTrips.sort((a,b) => {
                if (a.station.name > b.station.name) return -1;
                if (a.station.name < b.station.name) return 1;
                return 0;
            });
            break;
        case 'status': {
            buisnessTrips.sort((a,b) => {
                if (a.status > b.status) return -1;
                if (a.status < b.status) return 1;
                return 0;
            })
            break;
        }
        case 'dateOfBegin': {
            buisnessTrips.sort((a,b) => {
                if (a.dateOfBegin > b.dateOfBegin) return 1;
                if (a.dateOfBegin < b.dateOfBegin) return -1;
                return 0;
            })
            break;
        }
    }
    console.log(filter);
    switch(filter) {
        case 'wait': 
            buisnessTrips = buisnessTrips.filter(t => t.status == 'Ожидание подтверждения работником');
            break;
        case 'accepted': 
            buisnessTrips = buisnessTrips.filter(t => t.status == 'Принято');
            break;
        case 'canceled': 
            buisnessTrips = buisnessTrips.filter(t => t.status == 'Отказано');
            break;
        case 'success': 
            buisnessTrips = buisnessTrips.filter(t => t.status == 'Завершено успешно');
            break;
    } 
    res.render('chief/buisness-trips', {
        pageTitle: 'Все командировки',
        buisnessTrips: buisnessTrips,
        userId: userId
    });
};

export const postFindTrips = async(req, res) => {
    const userId = req.body.userId;
    const user = await User.findByPk(userId);
    const chief = await user.getChief();
    const department = await chief.getDepartment();
    const find = req.body.find;
    let buisnessTrips = await BuisnessTrip.findAll({
        where: {
            departmentId: department.id
        }
    });
    for (let buisnessTrip of buisnessTrips) {
        buisnessTrip.station = await buisnessTrip.getStation();
        buisnessTrip.worker = await buisnessTrip.getWorker();
    }
    buisnessTrips = buisnessTrips.filter(t => t.station.name.includes(find) || t.status.includes(find) || t.dateOfBegin.includes(find) || t.worker.getFullName.includes(find));
    res.render('chief/buisness-trips', {
        pageTitle: 'Все командировки',
        buisnessTrips: buisnessTrips,
        userId: userId
    });
}

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
        console.log(userId);
        const user = await User.findByPk(userId);
        const chief = await user.getChief();
        const department = await chief.getDepartment();
        const newTrip = {
            dateOfBegin: req.body.dateOfBegin,
            duration: req.body.duration,
            goal: req.body.goal,
            orderNumber: req.body.orderNumber,
            orderDate: req.body.orderDate,
            cost: req.body.cost,
            workerId: req.body.workerId,
            departmentId: department.id,
            stationId: req.body.stationId,
            status: 'Ожидание подтверждения работником'
        }
        const trip = await BuisnessTrip.create(newTrip);
        res.redirect(`/chief/${userId}/buisness-trips`);
    } catch(e) {
        console.log(e);
        res.redirect('/error/500');
    }
};

export const postDeleteTrip = async(req, res) => {
    const userId = req.body.userId;
    const buisnessTripId = req.body.buisnessTripId;
    const buisnessTrip = await BuisnessTrip.findByPk(buisnessTripId);
    await buisnessTrip.destroy();
    res.redirect(`/chief/${userId}/buisness-trips`);
};

export const getEditTrip = async(req, res) => {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);
    const chief = await user.getChief();
    const department = await chief.getDepartment();
    const workers = await department.getWorkers();
    const stations = await Station.findAll();
    const buisnessTripId = req.params.buisnessTripId;
    const trip = await BuisnessTrip.findByPk(buisnessTripId);
    console.log(trip);
    res.render('chief/edit-trip', {
        pageTitle: 'Редактирование командировки',
        userId: userId,
        trip: trip,
        workers: workers,
        stations: stations
    });
};

export const postEditTrip = async(req, res) => {
    try {
        const userId = req.body.userId;
        const user = await User.findByPk(userId);
        const chief = await user.getChief();
        const department = await chief.getDepartment();
        const updatedTrip = {
            dateOfBegin: req.body.dateOfBegin,
            duration: req.body.duration,
            goal: req.body.goal,
            orderNumber: req.body.orderNumber,
            orderDate: req.body.orderDate,
            cost: req.body.cost,
            workerId: req.body.workerId,
            departmentId: department.id,
            stationId: req.body.stationId,
            status: 'Ожидание подтверждения работником'
        }
        const trip = await BuisnessTrip.update(updatedTrip, {
            where: {
                id: req.body.buisnessTripId
            }
        });
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
            adress: req.body.adress,
            imageURL: req.body.imageURL,
            description: req.body.description
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
            adress: req.body.adress,
            description: req.body.description,
            imageURL: req.body.imageURL
        };
        Station.update(updatedStation, {
            where: {
                id: stationId
            }
        });
        res.redirect(`/chief/${userId}/stations`);
    } catch(e) {
        console.log(e);
        res.redirect('/error/500');
    }
};