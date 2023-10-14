import { Router } from 'express';
import { loginController, registerController } from '../controllers/userController.js';

//router objetc
const router = Router()

//routers


//POST || LOGIN USER
router.post('/login',loginController);

//POST || REGISTER USER
router.post('/register',registerController);



export default router