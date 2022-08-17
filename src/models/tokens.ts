import mongoose from "mongoose";

const {Schema, model} = mongoose;

const TokenSchema = new Schema({
        //TODO сделать связь между коллекциями $ref
        token: {
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true
        },
        expiresIn: {
            type: Boolean,
            required: true
        }
    },
    {
        timestamps: true
    });


export const Token = model('Token', TokenSchema, 'Token')