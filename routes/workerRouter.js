import { Router } from 'express';

import * as workerController from '../controllers/workerController.js';

const workerRouter = Router();

workerRouter.get('/:userId', workerController.getWorker);

workerRouter.get('/:userId/buisness-trips', workerController.getTrips);

workerRouter.post('/buisness-trips/accept-trip', workerController.postAcceptTrip);

workerRouter.post('/buisness-trips/refuse-trip', workerController.postRefuseTrip);

export default workerRouter;