import axios from "axios";
import {logger} from './logger';

class Request {
    constructor(token = "") {
        this.request = logger(axios.create({
            baseURL: "http://localhost:3333",
        }));
        this.token = token;
    }

    get = (url) => {
        return this.request.get(url);
    };

    post = (url, params) => {
        return this.request.post(url, params);
    };

    delete = (url) => {
        return this.request.delete(url)
    };

    put = (url, params) => {
        return this.request.put(url, params)
    };
}

export const mongoRequest = new Request();