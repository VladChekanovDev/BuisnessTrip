import User from "../models/User.js";
import Department from "../models/Department.js";
import BuisnessTrip from "../models/BuisnessTrip.js";
import md5 from "md5";

export const getWorker = async(req, res, next) => {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);
    const worker = await user.getWorker();
    res.render('worker/worker', {
        pageTitle: 'Панель рабочего',
        userId: userId,
        worker: worker
    });
};

export const getTrips = async(req, res) => {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);
    const worker = await user.getWorker();
    const buisnessTrips = await worker.getBuisnessTrips();
    res.render('worker/buisness-trips', {
        pageTitle: 'Мои командировки',
        userId: userId,
        buisnessTrips: buisnessTrips
    });
};

export const postAcceptTrip = async(req, res) => {
    const userId = req.body.userId;
    const buisnessTripId = req.body.buisnessTripId;
    await BuisnessTrip.update({
        status: 'Принято'
    }, {
        where: {
            id: buisnessTripId
        }
    });
    res.redirect(`/worker/${userId}/buisness-trips`);
};

export const postRefuseTrip = async(req, res) => {
    const userId = req.body.userId;
    const buisnessTripId = req.body.buisnessTripId;
    await BuisnessTrip.update({
        status: 'Откланено'
    }, {
        where: {
            id: buisnessTripId
        }
    });
    res.redirect(`/worker/${userId}/buisness-trips`);
};

export const getTripCertificate = async(req, res) => {
    const userId = req.params.userId;
    const buisnessTripId = req.params.buisnessTripId;
    const buisnessTrip = await BuisnessTrip.findByPk(buisnessTripId);
    const department = await buisnessTrip.getDepartment();
    const chief = await department.getChief();
    const worker = await buisnessTrip.getWorker();
    const station = await buisnessTrip.getStation();
    let endDate = new Date(buisnessTrip.dateOfBegin);
    endDate.setDate(endDate.getDate() + buisnessTrip.duration);
    switch(endDate.getMonth()) {
        case 1: 
            endDate.month = 'января';
            break;
        case 2: 
            endDate.month = 'февраля';
            break;
        case 3: 
            endDate.month = 'марта';
            break;
        case 4: 
            endDate.month = 'апреля';
            break;
        case 5: 
            endDate.month = 'мая';
            break;
        case 6: 
            endDate.month = 'июня';
            break;
        case 7: 
            endDate.month = 'июля';
            break;
        case 8: 
            endDate.month = 'августа';
            break;
        case 9: 
            endDate.month = 'сентября';
            break;
        case 10: 
            endDate.month = 'октября';
            break;
        case 11: 
            endDate.month = 'ноября';
            break;
        case 12: 
            endDate.month = 'декабря';
            break;
    };
    console.log(endDate.month);
    res.render('worker/trip-certificate', {
        userId: userId,
        buisnessTrip: buisnessTrip,
        worker: worker,
        station: station,
        department: department,
        chief: chief,
        endDate: endDate  
    })
};

export const getChangeLogin = async(req, res) => {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);
    const worker = await user.getWorker();
    res.render('worker/change-login', {
        userId: userId,
        worker: worker,
        pageTitle: 'Изменить логин'
    });
};

export const getChangePassword = async(req, res) => {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);
    const worker = await user.getWorker();
    res.render('worker/change-password', {
        userId: userId,
        worker: worker,
        pageTitle: 'Изменить пароль'
    });    
};

export const postChangePassword = async(req, res) => {
    const userId = req.body.userId;
    const workerId = req.body.workerId;
    const newPassword = req.body.newPassword;
    User.update({
        password: md5(newPassword) 
    }, {
        where: {
            id: userId
        }
    });
    res.redirect(`/worker/${userId}`);
};

export const postChangeLogin = async(req, res) => {
    const userId = req.body.userId;
    const workerId = req.body.workerId;
    const newLogin = req.body.newLogin;
    User.update({
        login: newLogin 
    }, {
        where: {
            id: userId
        }
    });
    res.redirect(`/worker/${userId}`);
}