import { Router } from 'express';
import userController from '../controllers/UserController.js';
import loginRequired from '../middleware/loginRequired.js';
import loginEmailValitator from '../middleware/loginEmailValitator.js';
const router = new Router();

router.post('/', loginEmailValitator, userController.store);
router.get('/', loginRequired, userController.index);
router.post('/login', loginEmailValitator, userController.autentecate);
router.get('/', userController.show);
router.put('/', loginEmailValitator, userController.update);
router.delete('/', userController.delete);

export default router;
