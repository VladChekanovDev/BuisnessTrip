import md5 from 'md5';

import User from '../models/User.js';

export const getBackSlash = (req, res, next) => {
    res.redirect('/main');
};

export const getMain = (req, res, next) => {
    const userNotFound = req.query.userNotFound;
    res.render('main/main', {
        pageTitle: 'Главная страница',
        userNotFound: userNotFound
    });
};

export const postAuthUser = async(req, res, next) => {
    const login = req.body.login;
    const password = md5(req.body.password);
    const user = await User.authorizate(login, password);
    if (user) {
        console.log(user);
        return res.redirect(`/${user.userType}/${user.id}/get-main-page`);
    }
    res.redirect(`/main?userNotFound=true`);
}

export const getAboutProgram = (req, res) => {
    res.render('main/about-program', {
        pageTitle: 'О программе'
    })
}