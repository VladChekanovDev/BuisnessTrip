export const getAdmin = (req, res, next) => {
    res.render('admin/admin', {
        pageTitle: 'Панель администратора'
    });
}