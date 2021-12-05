import express from 'express';
import bodyParser from 'body-parser';
import md5 from 'md5';

// Routers packages
import adminRouter from './routes/adminRouter.js';
import workerRouter from './routes/workerRouter.js';
import mainRouter from './routes/mainRouter.js';
import errorRouter from './routes/errorRouter.js';
import chiefRouter from './routes/chiefRouter.js';

//database
import sequelize from './helpers/database.js';

//models
import User from './models/User.js';
import Admin from './models/Admin.js';
import Chief from './models/Chief.js';
import Department from './models/Department.js';
import Worker from './models/Worker.js';
import Station from './models/Station.js';
import BuisnessTrip from './models/BuisnessTrip.js';

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
app.use('/chief', chiefRouter);

app.use((req, res, next) => {
    res.status(404).redirect('/error/404');
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
Department.hasMany(Worker);
Department.hasMany(BuisnessTrip);
BuisnessTrip.belongsTo(Department);
BuisnessTrip.belongsTo(Station);
Station.hasOne(BuisnessTrip);
Worker.hasMany(BuisnessTrip);
BuisnessTrip.belongsTo(Worker);

sequelize
    .sync({force: true})
    // .sync()
    .then(async() => {
        const user = await User.create({
            login: 'admin',
            password: md5('admin'),
            userType: 'admin'
        });
        const admin = await Admin.create();
        await user.setAdmin(admin);
        const department = await Department.create({
            name: 'Отдел автоматизации и информатизации',
            adress: 'г. Гродно, ГГПК',
            description: 'Занимается разработкой ПО для ГГПК',
            imageURL: 'https://triniti-grodno.by/assets/images/1601911036.jpg'
        });
        await User.registrateChief({
            login: 'chief',
            password: md5('chief'),
            userType: 'chief'
        }, {
            firstName: 'Владислав',
            lastName: 'Чеканов',
            patronymic: 'Дмитриевич',
            position: 'Гланвный инженер',
            imageURL: 'https://sun9-29.userapi.com/impg/XDKMicfkhCn6Usw3HKKcUZfm7zui5PAHyAHTug/sdLz5LscY8A.jpg?size=1280x857&quality=96&sign=969fc8ffb99db4027cee678a9499ea29&type=album'
        }, department.id);
        await User.registrateWorker({
            login: 'worker',
            password: md5('worker'),
            userType: 'worker'
        }, {
            lastName: 'Скобель',
            firstName: 'Никита',
            patronymic: 'Сергеевич',
            dateOfBirth: '2002-09-26',
            dateOfHiring: '2021-09-26',
            salary: '1',
            imageURL: 'https://sun9-84.userapi.com/impg/pgtKPg_RaQpaKd63gAxLjO4gaDIToqjoXRHypw/zCapeCdmRds.jpg?size=2560x1714&quality=96&sign=0601e7640c7f76124e55ed0a9ec1cc12&type=album',
            position: 'Чернорабочий'
        }, department.id);
        app.listen(3000);
    })
    .catch(err => console.log(err));
//test