import { Router } from "express";

import * as chiefController from '../controllers/chiefController.js';

const chiefRouter = Router();

chiefRouter.get('/:userId/workers', chiefController.getWorkers);

chiefRouter.get('/:userId/workers/add-worker', chiefController.getAddWorker);

chiefRouter.post('/workers/add-worker', chiefController.postAddWorker);

chiefRouter.post('/workers/delete-worker', chiefController.postDeleteWorker);

chiefRouter.post('/workers/fire-worker', chiefController.postFireWorker);

chiefRouter.get('/:userId/buisness-trips', chiefController.getBuinessTrips);

chiefRouter.post('/buisness-trips/find', chiefController.postFindTrips);

chiefRouter.get('/:userId/buisness-trips/add-trip', chiefController.getAddTrip);

chiefRouter.post('/buisness-trips/add-trip', chiefController.postAddTrip);

chiefRouter.post('/buisness-trips/delete-trip', chiefController.postDeleteTrip);

chiefRouter.get('/:userId/buisness-trips/edit-trip/:buisnessTripId', chiefController.getEditTrip);

chiefRouter.post('/buisness-trips/edit-trip', chiefController.postEditTrip);

chiefRouter.get('/:userId/stations', chiefController.getStations);

chiefRouter.get('/:userId/stations/add-station', chiefController.getAddStation);

chiefRouter.post('/stations/add-station', chiefController.postAddStation);

chiefRouter.post('/stations/delete-station', chiefController.postDeleteStation);

chiefRouter.get('/:userId/stations/edit-station/:stationId', chiefController.getEditStation);

chiefRouter.post('/stations/edit-station', chiefController.postEditStation);

chiefRouter.get('/:userId/change-login', chiefController.getChangeLogin);

chiefRouter.post('/change-password', chiefController.postChangePassword);

chiefRouter.post('/change-login', chiefController.postChangeLogin);

chiefRouter.get('/:userId/change-password', chiefController.getChangePassword);

chiefRouter.get('/:userId/get-main-page', chiefController.getChief);

export default chiefRouter;