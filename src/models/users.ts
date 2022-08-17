import mongoose from "mongoose";
import bcrypt from "bcrypt"

const {Schema, model} = mongoose;

const UserSchema = new Schema({
    //TODO сделать связь между коллекциями $ref
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// скрытие данных штатными средствами
UserSchema.pre("save", async function (next) {
    // const user = this // в this будет храниться модель из схемы {email, password}
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next()
});

// добавляем метод для дешифрации пароля
// UserSchema.methods.isValidPassword = async function (password: string) {
//     const compare = await bcrypt.compare(password, this.password); // в password Будет пароль который ввел пользователь
//                                                                     // в this.pasword пароль из БД
//     return compare;
// }

export const User = model('User', UserSchema, 'User')