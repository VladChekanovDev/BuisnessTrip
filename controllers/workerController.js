import User from "../models/User.js";
import Department from "../models/Department.js";

export const getWorker = (req, res, next) => {
    res.render('worker/worker', {
        pageTitle: 'Панель рабочего'
    })
}