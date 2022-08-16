import mongoose, {CallbackError} from "mongoose";
import {MongoError} from 'mongodb';

const {Schema, model} = mongoose;

const chatsSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
});

const hanlde11000 = <T>(error: Error, _: T, next: (err?: CallbackError) => void) => {
    if (error.name === 'MongoServerError' && (error as MongoError).code === 11000) {
        next(new Error('There was a dublicate key error'))
    } else {
        next(error);
    }
}

// постобработка запроса
chatsSchema.post('save', hanlde11000)
chatsSchema.post('update', hanlde11000)
chatsSchema.post('findOneAndUpdate', hanlde11000)
chatsSchema.post('insertMany', hanlde11000)


export const Chats = model('Chats', chatsSchema, 'Chats')