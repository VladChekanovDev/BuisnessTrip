export const getBackSlash = (req, res, next) => {
    res.redirect('/main');
};

export const getMain = (req, res, next) => {
    res.render('main/main', {
        pageTitle: 'Main page'
    });
};

export const postAuth = (req, res, next) => {
    
}