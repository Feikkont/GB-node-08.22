import chatService from "../service/chat-service.js";

class ChatController {
    async getChats(req, res, next) {
        try {
            const chats = await chatService.getChats()
            return res.json(chats)
        } catch (e) {
            next(e)
        }
    }

    async addChat(req, res, next) {
        try {
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
            const id = req.params.id;
            const {name} = req.body;
            const updatedChat = await chatService.updateChat(id, name);
            return res.status(201).json(updatedChat)
        } catch (e) {
            next(e);
        }
    }
}

export default new ChatController()