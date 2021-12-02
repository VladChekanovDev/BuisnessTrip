import { Router } from 'express';

import * as adminController from '../controllers/adminController.js';

const adminRouter = Router();

adminRouter.get('/departments', adminController.getDepartments);

adminRouter.get('/departments/add-department', adminController.getAddDepartment);

adminRouter.post('/departments/add-department', adminController.postAddDepartment);

adminRouter.get('/chiefs', adminController.getChiefs);

adminRouter.get('/chiefs/add-chief', adminController.getAddChief);

adminRouter.post('/chiefs/add-chief', adminController.postAddChief);

adminRouter.get('/:adminId', adminController.getAdmin);

export default adminRouter;