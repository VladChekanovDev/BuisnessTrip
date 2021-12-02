import User from '../models/User.js';

export const getBackSlash = (req, res, next) => {
    res.redirect('/main');
};

export const getMain = (req, res, next) => {
    const userNotFound = req.query.userNotFound;
    console.log(userNotFound);
    res.render('main/main', {
        pageTitle: 'Главная страница',
        userNotFound: userNotFound
    });
};

export const postAuthUser = async(req, res, next) => {
    const login = req.body.login;
    const password = req.body.password;
    const user = await User.authorizate(login, password);
    console.log(user);
    if (user) {
        return res.redirect(`/${user.userType}/${user.id}`);
    }
    res.redirect(`/main?userNotFound=true`);
}

export const postAddChief = (req, res, next) => {
    
};