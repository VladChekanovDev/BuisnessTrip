import { Router } from 'express';

import * as workerController from '../controllers/workerController.js';

const workerRouter = Router();

workerRouter.get('/:userId/buisness-trips', workerController.getTrips);

workerRouter.post('/buisness-trips/accept-trip', workerController.postAcceptTrip);

workerRouter.post('/buisness-trips/refuse-trip', workerController.postRefuseTrip);

workerRouter.get('/:userId/buisness-trips/get-certificate/:buisnessTripId', workerController.getTripCertificate);

workerRouter.post('/buisness-trips/go-to-trip', workerController.postGoToTrip);

workerRouter.post('/buisness-trips/in-trip', workerController.postInTrip);

workerRouter.post('/buisness-trips/go-back', workerController.postGoBack);

workerRouter.post('/buisness-trips/came-back', workerController.postCameBack);

workerRouter.get('/:userId/change-password', workerController.getChangePassword);

workerRouter.post('/change-password', workerController.postChangePassword);

workerRouter.get('/:userId/change-login', workerController.getChangeLogin);

workerRouter.post('/change-login', workerController.postChangeLogin);

workerRouter.get('/:userId/get-main-page', workerController.getWorker);

export default workerRouter;