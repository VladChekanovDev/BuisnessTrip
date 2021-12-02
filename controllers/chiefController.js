import Chief from "../models/Chief.js";
import Worker from "../models/Worker.js";
import Department from "../models/Department.js";

export const getChief = (req, res, next) => {
    res.render('chief/chief', {
        pageTitle: 'Панель начальника'
    })
}