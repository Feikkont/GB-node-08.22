import {Chats} from "../models/chats.js";
import {ApiError} from "../exceptions/api-error.js";

class ChatService {
    async getChats() {
        const chats = await Chats.find()
        return chats
    }

    async addChat(name) {
        const newChat = await Chats.create({name})
        return newChat
    }

    async deleteChat(id) {
        const deleted = await Chats.findByIdAndDelete(id)
        return deleted
    }

    async updateChat(id, name) {
        const chat = await Chats.findById(id)
        if (!chat) {
            throw ApiError.BadRequest('Чат не найден')
        }
        const updateChat = await Chats.findByIdAndUpdate(id, {name})
        return updateChat;
    }
}

export default new ChatService()