import {Messages} from "../models/messages.js";
import {ApiError} from "../exceptions/api-error.js";

class MessageService {
    async getMessages() {
        const messages = await Messages.find()
        let convertedMessages = {}
        messages.forEach((el) => {
            if (!convertedMessages.hasOwnProperty(el.chatId)) {
                //ts-ignore
                convertedMessages[el.chatId] = []
            }
        })
        for (let key in convertedMessages) {
            //ts-ignore
            convertedMessages[key] = messages.filter(el => el.chatId == key)
        }
        return convertedMessages
    }

    async getMessagesByChat(id) {
        return Messages.find({chatId: id})
    }

    async addMessage(message) {
        return Messages.create(message)
    }

    async deleteMessage(id) {
        return Messages.findByIdAndDelete(id)
    }

    async updateMessage(id, message) {
        const msg = await Messages.findById(id)
        if (!msg) {
            throw ApiError.BadRequest('Сообщение не найдено')
        }
        return Messages.findByIdAndUpdate(id, message)
    }
}

export default new MessageService()