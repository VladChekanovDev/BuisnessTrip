import { Router } from "express";

import * as chiefController from '../controllers/chiefController.js';

const chiefRouter = Router();

chiefRouter.get('/:userId/workers', chiefController.getWorkers);

chiefRouter.get('/:userId/workers/add-worker', chiefController.getAddWorker);

chiefRouter.post('/workers/add-worker', chiefController.postAddWorker);

chiefRouter.get('/:userId/buisness-trips', chiefController.getBuinessTrips);

chiefRouter.get('/:userId/buisness-trips/add-trip', chiefController.getAddTrip);

chiefRouter.post('/buisness-trips/add-trip', chiefController.postAddTrip);

chiefRouter.get('/:userId', chiefController.getChief);

export default chiefRouter;