import User from '../models/User.js';
import Chief from "../models/Chief.js";
import Worker from "../models/Worker.js";
import Department from "../models/Department.js";

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
            workers: workers
        });
    } catch(e) {
        console.log(e);
        res.redirect('/error/500');
    }
};