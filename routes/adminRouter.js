import { Router } from 'express';

import * as adminController from '../controllers/adminController.js';

const adminRouter = Router();

adminRouter.get('/:userId/departments', adminController.getDepartments);

adminRouter.get('/:userId/departments/add-department', adminController.getAddDepartment);

adminRouter.post('/departments/add-department', adminController.postAddDepartment);

adminRouter.post('/departments/delete-department', adminController.postDeleteDepartment);

adminRouter.get('/:userId/departments/edit-department/:departmentId', adminController.getEditDepartment);

adminRouter.post('/departments/edit-department', adminController.postEditDepartment);

adminRouter.get('/:userId/chiefs', adminController.getChiefs);

adminRouter.get('/:userId/chiefs/add-chief', adminController.getAddChief);

adminRouter.post('/chiefs/add-chief', adminController.postAddChief);

adminRouter.post('/chiefs/delete-chief', adminController.postDeleteChief);

adminRouter.get('/:userId/chiefs/edit-chief/:chiefId', adminController.getEditChief);

adminRouter.post('/chiefs/edit-chief', adminController.postEditChief);

adminRouter.get('/:userId/workers', adminController.getWorkers);

adminRouter.get('/:userId/workers/add-worker', adminController.getAddWorker);

adminRouter.post('/workers/add-worker', adminController.postAddWorker);

adminRouter.post('/workers/delete-worker', adminController.postDeleteWorker);

adminRouter.get('/:userId/workers/edit-worker/:workerId', adminController.getEditWorker);

adminRouter.post('/workers/edit-worker', adminController.postEditWorker);

adminRouter.post('/workers/fire-worker', adminController.postFireWorker);

adminRouter.get('/:userId/stations', adminController.getStations);

adminRouter.get('/:userId/stations/add-station', adminController.getAddStation);

adminRouter.post('/stations/add-station', adminController.postAddStation);

adminRouter.post('/stations/delete-station', adminController.postDeleteStation);

adminRouter.get('/:userId/stations/edit-station/:stationId', adminController.getEditStation);

adminRouter.post('/stations/edit-station', adminController.postEditStation);

adminRouter.get('/:userId', adminController.getAdmin);

export default adminRouter;