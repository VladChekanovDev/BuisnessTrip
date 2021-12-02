import { Router } from "express";

import * as chiefController from '../controllers/chiefController.js';

const chiefRouter = Router();

chiefRouter.get('/:userId/workers', chiefController.getWorkers);

chiefRouter.get('/:userId/workers/add-worker', chiefController.getAddWorker);

chiefRouter.post('/workers/add-worker', chiefController.postAddWorker);

chiefRouter.get('/:userId', chiefController.getChief);

export default chiefRouter;