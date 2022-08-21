import express from "express";
import {Messages} from "../models/messages.js";
import messageController from "../controllers/message-controller.js";

const router = express.Router();

router.get('/', messageController.getMessages);
router.post('/', messageController.addMessage);
router.get('/:chatId', messageController.getMessagesByChat);
router.delete('/:messageId', messageController.deleteMessage);
router.put('/:messageId', messageController.updateMessage);

export default router