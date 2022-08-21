import express from "express";
import {Chats} from "../models/chats.js";
import chatController from "../controllers/chat-controller.js";

const router = express.Router();

router.get('/', chatController.getChats);
router.post('/', chatController.addChat);
router.delete('/:id', chatController.deleteChat);
router.put('/:id', chatController.updateChat);

export default router