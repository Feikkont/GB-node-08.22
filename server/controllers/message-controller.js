import messageService from "../service/message-service.js";

class MessageController {
    async getMessages(req, res, next) {
        try {
            const messages = await messageService.getMessages()
            return res.json(messages)
        } catch (e) {
            next(e)
        }
    }

    async getMessagesByChat(req, res, next) {
        try {
            const id = req.params.chatId;
            const messagesByChat = await messageService.getMessagesByChat(id)
            return res.json(messagesByChat)
        } catch (e) {

        }
    }

    async addMessage(req, res, next) {
        try {
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
            const id = req.params.messageId;
            const message = req.body;
            const updatedMessage = await messageService.updateMessage(id, message);
            return res.status(201).json(updatedMessage)
        } catch (e) {
            next(e);
        }
    }
}

export default new MessageController()