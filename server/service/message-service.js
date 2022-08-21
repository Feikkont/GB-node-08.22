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
        const messages = await Messages.find({chatId: id})
        return messages
    }

    async addMessage(message) {
        const newMessage = await Messages.create(message)
        return newMessage;
    }

    async deleteMessage(id) {
        const deleted = await Messages.findByIdAndDelete(id)
        return deleted
    }

    async updateMessage(id, message) {
        const msg = await Messages.findById(id)
        if (!msg) {
            throw ApiError.BadRequest('Сообщение не найдено')
        }
        const updateMessage = await Messages.findByIdAndUpdate(id, message)
        return updateMessage;
    }
}

export default new MessageService()