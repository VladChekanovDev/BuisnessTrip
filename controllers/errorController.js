export const get500 = (req, res, next) => {
    res.status(500).render('errors/error', {
        errorStatus: 500,
        pageTitle: 'Internal Server Error'
    });
};

export const get404 = (req, res, next) => {
    res.status(404).render('errors/error', {
        errorStatus: 404,
        pageTitle: 'Page Not Found'
    });
};