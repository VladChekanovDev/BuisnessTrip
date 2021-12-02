import { Router } from 'express';

import * as adminController from '../controllers/adminController.js';

const adminRouter = Router();

adminRouter.get('/:adminId', adminController.getAdmin);

export default adminRouter;