import mongoose from "mongoose";
const {Schema, model} = mongoose;

const TokenSchema = new Schema({
    user:{type: Schema.Types.ObjectId, required: true, ref: 'User'},
    refreshToken: {type: String, required:true}
})

export const Token = model('Token', TokenSchema, 'Tokens')