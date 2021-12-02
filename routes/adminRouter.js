import { Router } from 'express';

import * as adminController from '../controllers/adminController.js';

const adminRouter = Router();

adminRouter.get('/:userId/departments', adminController.getDepartments);

adminRouter.get('/:userId/departments/add-department', adminController.getAddDepartment);

adminRouter.post('/departments/add-department', adminController.postAddDepartment);

adminRouter.get('/:userId/chiefs', adminController.getChiefs);

adminRouter.get('/:userId/chiefs/add-chief', adminController.getAddChief);

adminRouter.post('/chiefs/add-chief', adminController.postAddChief);

adminRouter.get('/:userId/workers', adminController.getWorkers);

adminRouter.get('/:userId/workers/add-worker', adminController.getAddWorker);

adminRouter.post('/workers/add-worker', adminController.postAddWorker);

adminRouter.get('/:userId', adminController.getAdmin);

export default adminRouter;