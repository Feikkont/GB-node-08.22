import express from "express";

const router = express.Router();

//типизация
interface Chats {
    id: String
    name: String
}

let chats: Chats[] = [];

router.get('/', (req, res) => {
    res.send(chats)
})

router.post('/', (req, res) => {
    console.log(req.body)
    chats.push(req.body)
    res.status(201)
    res.send('ok')
})

router.delete('/:id', (req, res) => {
    console.log(req.params.id)
    chats = chats.filter(chat => chat.id !== req.params.id)
    res.status(201)
    res.send('ok')
})

router.put('/:id', (req, res) => {
    console.log(req.params.id)
    chats = chats.map((chat) => {
        if (chat.id === req.params.id) {
            return {
                id: chat.id,
                name: req.body.name
            }
        } else {
            return chat
        }
    })
    res.status(201)
    res.send('ok')
})

export default router