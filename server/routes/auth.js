import express from "express";
import UserController from "../controllers/user-controller.js";
import {body, check, cookie} from "express-validator";
import {authMiddleware} from "../middlewares/auth-middleware.js";


const router = express.Router();

router.post('/registration',
    body('email').isEmail(), // проверка емейла
    body('password').isLength({
        min: 3,
        max: 32
    }),// проверка длины пароль от 3 до 32 символов
    UserController.registration);
router.post('/login',
    body('email').isEmail(), // проверка емейла
    body('password').notEmpty(), UserController.login);
router.post('/logout',
    cookie('refreshToken').notEmpty()
, UserController.logout);
router.get('/activate/:link', UserController.activate);
router.get('/refresh', UserController.refresh);
router.patch('/userupdate', authMiddleware, UserController.updateUser);
router.get('/users', authMiddleware, UserController.getUsers);

export default router
