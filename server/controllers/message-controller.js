import messageService from "../service/message-service.js";
import {validationResult} from "express-validator";
import {ApiError} from "../exceptions/api-error.js";

class MessageController {
    async getMessages(req, res, next) {
        try {
            const messages = await messageService.getMessages()
            return res.json(messages)
        } catch (err) {
            next(err)
        }
    }

    async getMessagesByChat(req, res, next) {
        try {
            const id = req.params.chatId;
            const messagesByChat = await messageService.getMessagesByChat(id)
            return res.json(messagesByChat)
        } catch (err) {
            next(err)
        }
    }

    async addMessage(req, res, next) {
        try {
            const errors = validationResult(req); // кладем результат валидации в переменную
            // если массив не пустой, то есть ошибка и вызываем ApiError
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const message = req.body;
            const newMessage = await messageService.addMessage(message);
            return res.status(201).json(newMessage)
        } catch (err) {
            next(err)
        }
    }

    async deleteMessage(req, res, next) {
        try {
            const id = req.params.messageId;
            const deleted = await messageService.deleteMessage(id);
            return res.status(201).json(deleted)
        } catch (err) {
            next(err)
        }
    }

    async updateMessage(req, res, next) {
        try {
            const errors = validationResult(req); // кладем результат валидации в переменную
            // если массив не пустой, то есть ошибка и вызываем ApiError
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Ошибка при валидации', errors.array()))
            }
            const id = req.params.messageId;
            const message = req.body;
            const updatedMessage = await messageService.updateMessage(id, message);
            return res.status(201).json(updatedMessage)
        } catch (err) {
            next(err);
        }
    }
}

export default new MessageController()