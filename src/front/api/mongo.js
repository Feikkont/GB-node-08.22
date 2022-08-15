import {mongoRequest} from "./mongoRequest";

export const getChatMongoApi = () => {
    return mongoRequest.get(`/chats`);
};

export const addChatMongoApi = (chatName) => {
    return mongoRequest.post(`/chats`, chatName);
};

export const deleteChatMongoApi = (chatId) => {
    return mongoRequest.delete(`/chats/${chatId}`);
};

export const updateChatMongoApi = (chatId, chatName) => {
    return mongoRequest.put(`/chats/${chatId}`, chatName);
};

export const getMessagesMongoApi = () => {
    return mongoRequest.get(`/messages`);
};

export const addMessagesMongoApi = (message) => {
    return mongoRequest.post(`/messages`, message);
};

export const deleteMessagesMongoApi = (messageId) => {
    return mongoRequest.delete(`/messages/${messageId}`);
};

export const updateMessagesMongoApi = (messageId, message) => {
    return mongoRequest.put(`/messages/${messageId}`, message);
};