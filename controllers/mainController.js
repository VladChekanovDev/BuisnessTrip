import User from '../models/User.js';

export const getBackSlash = (req, res, next) => {
    res.redirect('/main');
};

export const getMain = (req, res, next) => {
    res.render('main/main', {
        pageTitle: 'Main page'
    });
};

export const postAuthUser = async(req, res, next) => {
    const login = req.body.login;
    const password = req.body.password;
    const user = await User.authorizate(login, password);
    console.log(user);
    if (user) {
        return res.redirect(`/main?userId=${user.id}`);
    }
    throw new Error();
    return res.redirect(`/main`);
}

export const postAdd = (req, res, next) => {
    
};