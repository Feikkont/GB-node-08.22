import express from "express";
import {Chats} from "../models/chats";

const router = express.Router();

//типизация
// interface Chats {
//     id: String
//     name: String
// }
//
// let chats: Chats[] = [];

router.get('/', async (req, res) => {
    const chats = await Chats.find()
    res.send(chats)
})

router.post('/', async (req, res) => {
    // try {
    //     const newChat = await Chats.create(req.body)
    //     // chats.push(req.body)
    //     res.status(201)
    //     res.json(newChat)
    // } catch (err) {
    //     res.send(err)
    // }
    await Chats.create(req.body, (err: Error, newChat: typeof Chats) => {
        if (err) {
            //handler error
        }
        res.status(201)
        res.json(newChat)
    })
 })

router.delete('/:id', async (req, res) => {
    // console.log(req.params.id)
    // chats = chats.filter(chat => chat.id !== req.params.id)
    const deleted = await Chats.findByIdAndDelete(req.params.id)
    res.status(201)
    res.json(deleted)
})

router.put('/:id', async (req, res) => {
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

    const updateChat = await Chats.findByIdAndUpdate(req.params.id, req.body)
    res.status(201)
    res.json(updateChat)
})

export default router