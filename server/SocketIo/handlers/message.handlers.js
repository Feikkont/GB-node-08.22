
import messageService from "../../service/message-service.js";
import {Messages} from "../../models/messages.js";
import {ApiError} from "../../exceptions/api-error.js";

export default function messageHandlers(io, socket) {
    /* Для socket io postman
    http://localhost:3333
    {
    "chatId": "62f88caad36dd8d1d540f6e0",
    "user": "User",
    "body": "Hi, i;m your friend122223",
    "date": "15.08.2022"
    }
    client-msg
    listener: server-msg
    */
    socket.on('client-msg', (data) => {
        (async () => {
            // const message = data;
            const newMessage = await messageService.addMessage(data)
            console.log('new ', newMessage)
            socket.emit('server-msg', newMessage)
            socket.broadcast.emit('server-msg', newMessage)
        })()
    })
    /* Для socket io postman
    http://localhost:3333
    {
    "messageId" : "63058456b32158dff393db4b"
    }
    message-delete
    listener: server-msg-deleted
    */

    socket.on('message-delete', ({messageId}) => {
        (async () => {
            console.log('messageId', messageId)
            // const message = data;
            const deleted = await Messages.findByIdAndDelete(messageId)
            console.log('new ', deleted)
            socket.emit('server-msg-deleted', deleted)
            socket.broadcast.emit('server-msg-deleted', deleted)
        })()
    })

    /* Для socket io postman
    http://localhost:3333
    {
    "chatId": "62f88caad36dd8d1d540f6e0",
    "user": "User",
    "body": "Hi, i;m your friend133333",
    "date": "15.08.2022",
    "id" : "6305846cb32158dff393db4d"
     }
    message-update
    listener: server-msg-updated
    */
    socket.on('message-update', (message) => {
        (async () => {
            const msg = await Messages.findById(message.id)
            if (!msg) {
                throw ApiError.BadRequest('Сообщение не найдено')
            }
            const updated = await Messages.findByIdAndUpdate(message.id, message)
            console.log('new ', updated)
            socket.emit('server-msg-updated', updated)
            socket.broadcast.emit('server-msg-updated', updated)
        })()
    })
}