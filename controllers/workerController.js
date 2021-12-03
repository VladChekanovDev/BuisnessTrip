import User from "../models/User.js";
import Department from "../models/Department.js";
import BuisnessTrip from "../models/BuisnessTrip.js";

export const getWorker = (req, res, next) => {
    const userId = req.params.userId;
    res.render('worker/worker', {
        pageTitle: 'Панель рабочего',
        userId: userId
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
}