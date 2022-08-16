import express, {Request} from "express";
import {User} from "../models/users";
import jwt from 'jsonwebtoken';

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

router.post('/signin', (req, res) => {
    const email =  req.body.email;
    const password = req.body.password;
    

    const token = jwt.sign(user, 'JWT_SECRET');

    res.status(200).json({token})

})

export default router