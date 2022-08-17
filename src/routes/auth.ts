import express, {Request} from "express";
import {User} from "../models/users";
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt"
import {Token} from "../models/tokens";

const router = express.Router();

export interface TypedRequestBody<T> extends Request {
    body: T;
}

export type SignUpBody = TypedRequestBody<{ email: string, password: string }>

router.post('/signup', async (req: SignUpBody, res, next) => {
    await User.create(req.body, (err, newUser) => {
        if (err) next(err)

        const {_id, email} = newUser;
        res.status(201).send({_id, email})
        // не сокращенный формат
        // if (err) {
        //     next(err)
        // }
        //
        // res.status(201)
        // res.send(newUser)
    })
})

router.post('/signin', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // ищем пользователя
    const user = await User.findOne({email})

    if (!user) {
        res.status(400).json({message: "User or password is wrong"})
        return
    }
    // проверяем верный ли пароль. возвращет тру\фолс
    const compare = await bcrypt.compare(password, user?.password)

    // console.log('answer', answer)
    if (!compare) {
        res.status(200).json()
        res.status(400).json({message: "User or password is wrong"})
        return
    }
    const data = {
        _id: user._id,
        email: user.email
    }
    // создаем токен
    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1m'});

    const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '1d'});

    await Token.findOneAndUpdate({email: user.email, expiresIn: true}, {expiresIn: false})

    // await Token.findOne({email: user.email, expiresIn: true}).update({expiresIn: false})
    await Token.create({
        token: refreshToken,
        email: user.email,
        expiresIn: true
    }, (err, data) => {
        if (err) {
            res.status(200).json({error: true, message: "refresh token not be created"})
        }
        res.status(200).json({"accessToken": accessToken, "refreshToken": refreshToken})
    })
})

// refresh token
router.post('/token', async (req, res) => {
    const refreshToken = req.body.refreshToken

    if (refreshToken) {
        const decode =  jwt.decode(refreshToken)
        // провеяем есть ли токен в бд
        const expiresed = await Token.findOne({token: refreshToken, expiresIn: true})

        if (expiresed) {
            //@ts-ignore
            const accessToken = jwt.sign({_id: decode?._id,email: decode?.email}, process.env.ACCESS_TOKEN_SECRET as string)

            res.status(200).json({accessToken})
        } else {
            res.status(401).json({message: "Unauthorized access"})
        }


    }
})

export default router