export const get500 = (req, res, next) => {
    res.render('errors/error', {
        errorStatus: 500,
        pateTitle: 'Internal Server Error'
    });
};

export const get404 = (req, res, next) => {
    res.render('errors/error', {
        errorStatus: 404,
        pageTitle: 'Page Not Found'
    });
};