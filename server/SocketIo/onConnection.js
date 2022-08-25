import messageHandlers from './handlers/message.handlers.js'

const userMap = {}

export default function onConnection(io, socket) {
    // postman listeners: server-msg-user-connected, server-msg-connected-users
    userMap[socket.id]={
        id: socket.id
    }
    socket.emit('server-msg-user-connected', socket.id)
    socket.broadcast.emit('server-msg-user-connected', socket.id)
    socket.emit('server-msg-connected-users', Object.keys(userMap).length)
    socket.broadcast.emit('server-msg-connected-users', Object.keys(userMap).length)

    messageHandlers(io, socket)

    // postman listeners: server-msg-user-disconnected, server-msg-connected-users
    socket.on('disconnect', ()=> {
        delete userMap[socket.id]
        socket.emit('server-msg-user-disconnected', socket.id)
        socket.broadcast.emit('server-msg-user-disconnected', socket.id)
        socket.emit('server-msg-connected-users', Object.keys(userMap).length)
        socket.broadcast.emit('server-msg-connected-users', Object.keys(userMap).length)
    })
}