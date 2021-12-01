import express from 'express';
import bodyParser from 'body-parser';

// Routers packages
import adminRouter from './routes/adminRouter.js';
import workerRouter from './routes/workerRouter.js';
import mainRouter from './routes/mainRouter.js';
import errorRouter from './routes/errorRouter.js';

//database
import sequelize from './helpers/database.js';

//models
import User from './models/User.js';
import Admin from './models/Admin.js';
import Chief from './models/Chief.js';
import Department from './models/Department.js';
import Worker from './models/Worker.js';

import * as mainController from './controllers/mainController.js';

const app = express();

app.set('view engine', 'ejs');

app.use((req, res, next) => {
    console.log('~~Request Info');
    console.log(`URL: ${req.url}`);
    console.log(`Method: ${req.method}`);
    next();
});

app.use(express.static('./public'));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', mainController.getBackSlash);

app.use('/admin', adminRouter);
app.use('/worker', workerRouter);
app.use('/main', mainRouter);
app.use('/error', errorRouter);

app.use((req, res, next) => {
    res.redirect('/error/404');
});

//assoсiations
Worker.belongsTo(User);
Admin.belongsTo(User);
Chief.belongsTo(User);
User.hasOne(Worker);
User.hasOne(Admin);
User.hasOne(Chief);
Chief.belongsTo(Department);
Worker.belongsTo(Department);
Department.hasOne(Chief);
Department.hasOne(Worker);

sequelize
    .sync({force: true})
    .then(() => {
        User.create({
            login: 'admin',
            password: 'admin'
        })
            .then(() => {
                app.listen(3000);

            });
    })
    .catch(err => console.log(err));
//test