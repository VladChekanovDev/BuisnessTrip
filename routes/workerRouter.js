import { Router } from 'express';

import * as workerController from '../controllers/workerController.js';

const workerRouter = Router();

workerRouter.get('/:userId/buisness-trips', workerController.getTrips);

workerRouter.post('/buisness-trips/accept-trip', workerController.postAcceptTrip);

workerRouter.post('/buisness-trips/refuse-trip', workerController.postRefuseTrip);

workerRouter.get('/:userId/buisness-trips/get-certificate/:buisnessTripId', workerController.getTripCertificate);

workerRouter.get('/:userId/change-password', workerController.getChangePassword);

workerRouter.post('/change-password', workerController.postChangePassword);

workerRouter.get('/:userId/change-login', workerController.getChangeLogin);

workerRouter.post('/change-login', workerController.postChangeLogin);

workerRouter.get('/:userId', workerController.getWorker);

export default workerRouter;