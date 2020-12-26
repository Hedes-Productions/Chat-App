const io = require("socket.io")(3000, {
    cors: {
        origin: "*",
    },
    });

const users = {}

io.on('connection',function(socket){
    socket.on('new-user',function(name){
        users[socket.id] = name
        socket.broadcast.emit('user-connected',name)
    })
    socket.on('send-chat-message',function(message){
        socket.broadcast.emit('chat-message',{message:message,name:users[socket.id]})
    })
    socket.on('disconnect',function(name){
        socket.broadcast.emit('user-disconnected',users[socket.id])
        delete users[socket.id]
    })
})