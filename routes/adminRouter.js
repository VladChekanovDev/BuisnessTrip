import { Router } from 'express';

import * as adminController from '../controllers/adminController.js';

const adminRouter = Router();

adminRouter.get('/chiefs', adminController.getChiefs);

adminRouter.get('/chiefs/add-chief', adminController.getAddChief);

adminRouter.post('/chiefs/add-chief', adminController.postAddChief);

adminRouter.get('/:adminId', adminController.getAdmin);

export default adminRouter;