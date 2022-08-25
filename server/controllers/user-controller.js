import userService from "../service/user-service.js";
import {User} from "../models/user-model.js";
import {validationResult} from "express-validator"; //  результат валидации
import {ApiError} from "../exceptions/api-error.js";

class UserController {
    async registration(req, res, next){
        try {
            const errors = validationResult(req); // кладем результат валидации в переменную
            // если массив не пустой, то есть ошибка и вызываем ApiError
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const {email, password} = req.body;
            const userData = await userService.registration(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge:30 * 24 * 60 * 60 * 1000, httpOnly: true}) //30 дней httpOnly
            return res.json(userData)
        } catch (e) {
            next(e);
        }
    }

    async login(req, res, next){
        try {
            const errors = validationResult(req); // кладем результат валидации в переменную
            // если массив не пустой, то есть ошибка и вызываем ApiError
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const {email, password} = req.body;
            const userData = await userService.login(email, password)
            res.cookie('refreshToken', userData.refreshToken, {maxAge:30 * 24 * 60 * 60 * 1000, httpOnly: true}) //30 дней httpOnly
            return res.json(userData)
        } catch (e) {
            next(e);
        }
    }
    async logout(req, res, next){
        try {
            //из куки достаем рефреш токен
            const errors = validationResult(req); // кладем результат валидации в переменную
            // если массив не пустой, то есть ошибка и вызываем ApiError
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token)
        } catch (e) {
            next(e);
        }
    }
    async activate(req, res, next){
        try {
            const activationLink = req.params.link
            await userService.activate(activationLink);
            return res.redirect(process.env.CLIENT_URI)
        } catch (e) {
            next(e);
        }
    }
    async refresh(req, res, next){
        try {
            //из куки достаем рефреш токен
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken', userData.refreshToken, {maxAge:30 * 24 * 60 * 60 * 1000, httpOnly: true}) //30 дней httpOnly
            return res.json(userData)
        } catch (e) {
            next(e);
        }
    }
    async getUsers(req, res, next){
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (e) {
            next(e);
        }
    }

    async updateUser(req,res, next) {
        try {
            const {firstName, lastName, id} = req.body;
            const user = await userService.updateUser(firstName, lastName, id);
            return res.json(user);

        } catch (e) {
            next(e)
        }
    }

}

export default new UserController();