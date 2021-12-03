import { Router } from "express";

import * as chiefController from '../controllers/chiefController.js';

const chiefRouter = Router();

chiefRouter.get('/:userId/workers', chiefController.getWorkers);

chiefRouter.get('/:userId/workers/add-worker', chiefController.getAddWorker);

chiefRouter.post('/workers/add-worker', chiefController.postAddWorker);

chiefRouter.get('/:userId/buisness-trips', chiefController.getBuinessTrips);

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

chiefRouter.get('/:userId', chiefController.getChief);

export default chiefRouter;