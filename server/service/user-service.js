import {User} from "../models/user-model.js";
import {v4} from 'uuid'
import bcrypt from "bcrypt"
import mailService from "./mail-service.js";
import tokenService from "./token-service.js";
import {UserDto} from "../dtos/user-dtos.js";
import {Token} from "../models/token-model.js";
import {ApiError} from "../exceptions/api-error.js";

class UserService {
    async registration(email, password) {
        //ищем пользователя в базе
        const candidate = await User.findOne({email})
        if (candidate) {
            throw ApiError.BadRequest(`Пользователь с почтовым адресом ${email} уже существует`)
        }
        // хэшируем пароль
        const hashPassword = await bcrypt.hash(password, 3);
        //Генерируем ссылку
        const activationLink = v4();

        //сохраняем пользователя в бд
        const user = await User.create({email, password: hashPassword, activationLink});

        //отправляем письмо для актвации
        await mailService.sendActivationMail(email, `${process.env.API_URI}/api/activate/${activationLink}`);

        const userDto = new UserDto(user);// id, email, isActivated

        //генерируем токены
        const tokens = tokenService.generateToken({...userDto}) //{accessToken, refreshToken}
        // console.log('tokens: ', tokens)

        //записываем токен в бд
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }

    async activate(activationLink) {
        const user = await User.findOne({activationLink});
        if (!user) {
            throw ApiError.BadRequest('Неккоректная ссылка активации');
        }
        user.isActivated = true;
        await user.save()
    }

    async login(email, password) {
        const user = await User.findOne({email});
        if (!user) {
            throw ApiError.BadRequest('Пользователь не найден');
        }
        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Не корректный пароль');
        }
        console.log('user', user)
        const userDto = new UserDto(user);
        const tokens = tokenService.generateToken({...userDto}) //{accessToken, refreshToken}

        //записываем токен в бд
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }
    }

    async logout(refreshToken) {
        // const token = await tokenService.removeToken(refreshToken);
        // return token;
        return await tokenService.removeToken(refreshToken);
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiError.UnauthorizedError();
        }
        //Валидируем токен
        const userData = tokenService.validateRefreshToken(refreshToken);
        // проверяем есть ли токен в базе
        const tokenFromDb = await tokenService.findToken(refreshToken);
        if (!userData || !tokenFromDb) {
            throw ApiError.UnauthorizedError();
        }
        //находим пользователя, мало ли что могло поменять в бд за длительное время
        const user = await User.findById(userData.id);

        const userDto = new UserDto(user);
        console.log(userDto)
        const tokens = tokenService.generateToken({...userDto}) //{accessToken, refreshToken}

        //записываем токен в бд
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return {
            ...tokens,
            user: userDto
        }

    }

    async getAllUsers() {
        // const users = await User.find();
        // return users;
        return await User.find();
    }

    async updateUser(firstName, lastName, id){
        const user = await User.findById(id);
        if (!user) {
            throw ApiError.BadRequest('Пользователь не найден');
        }
        user.firstName = firstName;
        user.lastName = lastName
        await user.save()
        // const userDto = new UserDto(user);
        // return userDto
        return new UserDto(user);
    }
}


export default new UserService();