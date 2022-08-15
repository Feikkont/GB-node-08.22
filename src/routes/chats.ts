import express from "express";
import {Chats} from "../models/chats";

const router = express.Router();

router.get('/', async (req, res) => {
    const chats = await Chats.find()
    res.send(chats)
})

router.post('/', async (req, res) => {
    try {
        const newChat = await Chats.create(req.body)
        // chats.push(req.body)
        res.status(201)
        res.json(newChat)
    } catch (err) {
        res.send(err)
    }
})

router.delete('/:id', async (req, res) => {
    const deleted = await Chats.findByIdAndDelete(req.params.id)
    res.status(201)
    res.json(deleted)
})

router.put('/:id', async (req, res) => {
    const updateChat = await Chats.findByIdAndUpdate(req.params.id, req.body)
    res.status(201)
    res.json(updateChat)
})

export default router