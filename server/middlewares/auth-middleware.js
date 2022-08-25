import {ApiError} from "../exceptions/api-error.js";
import tokenService from "../service/token-service.js";

export const authMiddleware = (req, res, next) => {
    try {
        const authorizationHeader = req.headers.authorization;
        if(!authorizationHeader) {
            return next(ApiError.UnauthorizedError());
        }
        // разбиваем строку из хедера по символу пробела , первый элемент массива будет Bearer, второй токен
        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return next(ApiError.UnauthorizedError());
        }
        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return next(ApiError.UnauthorizedError());
        }
        req.user = userData;
        next()
    } catch (e) {
        return next(ApiError.UnauthorizedError());
    }
}