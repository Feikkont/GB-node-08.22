import express from "express";
import {Messages} from "../models/messages";

const router = express.Router();

// //типизация
// interface Message {
//     id: string,
//     user: string,
//     body: string,
// }
//
// type Messages = Record<string, Message[]>

// let messages: Messages = {
//     room1: [{
//         id: "1",
//         user: "user",
//         body: "string",
//     },
//         {
//             id: "2",
//             user: "Bot",
//             body: "string",
//         },
//         {
//             id: "3",
//             user: "user",
//             body: "string1",
//         }
//     ]
// };

router.get('/', async (req, res) => {
    const messages = await Messages.find()
    res.json(messages)
})

    .post('/', async (req, res) => {
        try {
            // const newMessage = await Messages.create({
            //     chatId: '1',
            //     user: 'USER',
            //     body: 'some text'
            // })
            const  newMessage = await Messages.create(req.body)
            res.json(newMessage)
        } catch (error) {
            res.status(500)
            res.send(error)
        }
    })

router.get('/:chatId', async (req, res) => {
    const message = await Messages.find({chatId : req.params.chatId})
    res.json(message)
})

// router.post('/:chatId', async (req, res) => {
//     // const newMessage: Message = req.body;
//     // messages[req.params.chatId].push(newMessage)
//     // console.log(req.body)
//     // chats.push(req.body)
//     // res.status(201)
//     const newMessage = await Messages.create(req.body)
//     res.status(201)
//     res.json(newMessage)
// })

router.delete('/:messgeId', async (req, res) => {
    // messages[req.params.chatId] = messages[req.params.chatId].filter(
    //     message => message.id !== req.params.messgeId
    // );
    // // console.log(req.params.id)
    // // chats = chats.filter(chat => chat.id !== req.params.id)
    // // res.status(201)
    // res.send('ok')

    const deleted = await Messages.findByIdAndDelete(req.params.messgeId)
    res.status(201)
    res.json(deleted)
})

router.put('/:messgeId', async (req, res) => {
    // messages[req.params.chatId] = messages[req.params.chatId].map(message => {
    //     if (message.id === req.params.messgeId) {
    //         return req.body
    //     } else {
    //         return message
    //     }
    // })
    //
    // // console.log(req.params.id)
    // // chats = chats.map((chat) => {
    // //     if (chat.id === req.params.id) {
    // //         return {
    // //             id: chat.id,
    // //             name: req.body.name
    // //         }
    // //     } else {
    // //         return chat
    // //     }
    // // })
    // // res.status(201)
    // res.send('ok')
    const updateMessage = await Messages .findByIdAndUpdate(req.params.messgeId, req.body)
    res.status(201)
    res.json(updateMessage)

})

export default router