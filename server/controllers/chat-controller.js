import chatService from "../service/chat-service.js";
import {validationResult} from "express-validator";
import {ApiError} from "../exceptions/api-error.js";

class ChatController {
    async getChats(req, res, next) {
        try {
            const chats = await chatService.getChats()
            return res.json(chats)
        } catch (err) {
            next(err)
        }
    }

    async addChat(req, res, next) {
        try {
            const errors = validationResult(req); // кладем результат валидации в переменную
            // если массив не пустой, то есть ошибка и вызываем ApiError
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const {name} = req.body;
            const newChat = await chatService.addChat(name);
            return res.status(201).json(newChat)
        } catch (err) {
            next(err)
        }
    }

    async deleteChat(req, res, next) {
        try {
            const id = req.params.id;
            const deleted = await chatService.deleteChat(id);
            return res.status(201).json(deleted)
        } catch (err) {
            next(err)
        }
    }

    async updateChat(req, res, next) {
        try {
            const errors = validationResult(req); // кладем результат валидации в переменную
            // если массив не пустой, то есть ошибка и вызываем ApiError
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const id = req.params.id;
            const {name} = req.body;
            const updatedChat = await chatService.updateChat(id, name);
            return res.status(201).json(updatedChat)
        } catch (err) {
            next(err);
        }
    }
}

export default new ChatController()