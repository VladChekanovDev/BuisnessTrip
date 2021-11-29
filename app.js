import express from 'express';

// Routers packages
import adminRouter from './routes/adminRouter.js';
import workerRouter from './routes/workerRouter.js';
import mainRouter from './routes/mainRouter.js';

const app = express();

app.use('/admin', adminRouter);
app.use('/worker', workerRouter);
app.use('/main', mainRouter);


app.listen(3000);