import express from "express";
import {Messages} from "../models/messages.js";
import messageController from "../controllers/message-controller.js";
import {check} from "express-validator";

const router = express.Router();

router.get('/', messageController.getMessages);
router.post('/',[
    check('chatId').isString().notEmpty(),
    check('user').isString().isLength({min:3}),
    check('body').isString().notEmpty(),
    check('date').isString().notEmpty()
], messageController.addMessage);
router.get('/:chatId', messageController.getMessagesByChat);
router.delete('/:messageId', messageController.deleteMessage);
router.put('/:messageId',[
    check('chatId').isString().notEmpty(),
    check('user').isString().isLength({min:3}),
    check('body').isString().notEmpty(),
    check('date').isString().notEmpty()
], messageController.updateMessage);

export default router