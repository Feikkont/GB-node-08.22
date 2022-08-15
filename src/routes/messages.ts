import express from "express";
import {Messages} from "../models/messages";

const router = express.Router();

router.get('/', async (req, res) => {
    const messages = await Messages.find()
    let test = {}
    messages.forEach((el) => {
        if (!test.hasOwnProperty(el.chatId)) {
            test[el.chatId] = []
        }
    })
    for (let key in test) {
        test[key] = messages.filter(el => el.chatId == key)
    }
    res.json(test)
})

    .post('/', async (req, res) => {
        try {
            const newMessage = await Messages.create(req.body)
            res.json(newMessage)
        } catch (error) {
            res.status(500)
            res.send(error)
        }
    })

router.get('/:chatId', async (req, res) => {
    const message = await Messages.find({chatId: req.params.chatId})
    res.json(message)
})

router.delete('/:messgeId', async (req, res) => {
    const deleted = await Messages.findByIdAndDelete(req.params.messgeId)
    res.status(201)
    res.json(deleted)
})

router.put('/:messgeId', async (req, res) => {
    const updateMessage = await Messages.findByIdAndUpdate(req.params.messgeId, req.body)
    res.status(201)
    res.json(updateMessage)
})

export default router