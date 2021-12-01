import { Router } from "express";

import * as errorController from "../controllers/errorController.js";

const errorRouter = Router();

errorRouter.get('/404', errorController.get404);

errorRouter.get('/500', errorController.get500);

export default errorRouter;