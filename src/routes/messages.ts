import express from "express";

const router = express.Router();

//типизация
interface Message {
    id: string,
    user: string,
    body: string,
}

type Messages = Record<string, Message[]>

let messages: Messages = {};

router.get('/', (req, res) => {

    res.send(messages)
})

.post('/', (req, res) => {
    messages[req.body.chatName] = [];
    res.send("Ok")
})

router.get('/:chatId', (req, res) => {
    res.send(messages[req.params.chatId])
})

router.post('/:chatId', (req, res) => {
    const newMessage: Message = req.body;
    messages[req.params.chatId].push(newMessage)
    // console.log(req.body)
    // chats.push(req.body)
    // res.status(201)
    res.send('ok')
})

router.delete('/:chatId/:messgeId', (req, res) => {
    messages[req.params.chatId] = messages[req.params.chatId].filter(
        message => message.id !== req.params.messgeId
    );
    // console.log(req.params.id)
    // chats = chats.filter(chat => chat.id !== req.params.id)
    // res.status(201)
    res.send('ok')
})

router.put('/:chatId/:messgeId', (req, res) => {
    messages[req.params.chatId] = messages[req.params.chatId].map(message => {
        if (message.id === req.params.messgeId) {
            return req.body
        } else {
            return message
        }
    })

    // console.log(req.params.id)
    // chats = chats.map((chat) => {
    //     if (chat.id === req.params.id) {
    //         return {
    //             id: chat.id,
    //             name: req.body.name
    //         }
    //     } else {
    //         return chat
    //     }
    // })
    // res.status(201)
    res.send('ok')
})

export default router