import {Chats} from "../models/chats.js";
import {ApiError} from "../exceptions/api-error.js";

class ChatService {
    async getChats() {
        return Chats.find()
    }

    async addChat(name) {
        return await Chats.create({name})
    }

    async deleteChat(id) {
        return Chats.findByIdAndDelete(id)
    }

    async updateChat(id, name) {
        const chat = await Chats.findById(id)
        if (!chat) {
            throw ApiError.BadRequest('Чат не найден')
        }
        return Chats.findByIdAndUpdate(id, {name})
    }
}

export default new ChatService()