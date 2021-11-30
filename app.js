import express from 'express';
import bodyParser from 'body-parser';

// Routers packages
import adminRouter from './routes/adminRouter.js';
import workerRouter from './routes/workerRouter.js';
import mainRouter from './routes/mainRouter.js';

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

app.listen(3000);
//test