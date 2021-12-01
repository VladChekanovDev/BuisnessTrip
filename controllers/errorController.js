export const get500 = (req, res, next) => {
    res.render('errors/error', {
        errorStatus: 500
    });
};

export const get404 = (req, res, next) => {
    res.render('errors/error', {
        errorStatus: 404
    });
};