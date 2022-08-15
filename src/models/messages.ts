import mongoose from "mongoose";

const {Schema, model} = mongoose;

const messagesSchema = new Schema({
    chatId: {
        type: String,
        required: true,
    },
    user: {  //author
        type: String,
        // enum: ['USER', 'BOT'],
        required: true,
    },
    body: { //text
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
});

export const Messages = model('Messages', messagesSchema, 'Messages')