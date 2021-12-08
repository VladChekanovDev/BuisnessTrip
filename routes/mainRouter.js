import { Router } from 'express';

import * as mainController from '../controllers/mainController.js';

const mainRouter = Router();

mainRouter.get('/', mainController.getMain);

mainRouter.post('/auth-user', mainController.postAuthUser);

mainRouter.get('/about-program', mainController.getAboutProgram);

export default mainRouter;