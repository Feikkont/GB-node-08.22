import express from "express";
import {Chats} from "../models/chats.js";
import chatController from "../controllers/chat-controller.js";
import {check} from "express-validator";

const router = express.Router();

router.get('/', chatController.getChats);
router.post('/', check('name').isString().isLength({min:3}), chatController.addChat);
router.delete('/:id', chatController.deleteChat);
router.put('/:id', check('name').isString().isLength({min:3}), chatController.updateChat);

export default router