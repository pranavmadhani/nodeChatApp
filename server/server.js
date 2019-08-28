const path = require('path')
const express = require('express')
const http = require('http')
const app = express()
const {
    generateMessage,
    generateLocationMessage
} = require('./utils/mesage')

const publicPath = path.join(__dirname, '../public')
console.log(publicPath)
const PORT = process.env.PORT || 3000;
const socketIO = require('socket.io')
var server = http.createServer(app)
var io = socketIO(server)
app.use(express.static(publicPath))
const {isRealString} = require('./utils/validator')
const {Users} = require('./utils/users')
var users = new Users();




io.on('connection', (socket) => { //reserved keyword
    console.log('new user connected')
   
   
   
    socket.on('disconnect', () => { //reserved keyword
        console.log('dis-connected')
        var user = users.removeUser(socket.id);

        if(user)
        {
            io.to(user.room).emit('updateUserList',users.getUserList(user.room));
            io.to(user.room).emit('newMessage',generateMessage('Admin',`${user.name} has left`));
        }

    })

    

    socket.on('join',(params,callback)=>{

        if(!isRealString(params.name) || !isRealString(params.room)){
            callback('error! name and room name are required.')
        }

        socket.join(params.room)
        users.removeUser(socket.id);
        users.addUser(socket.id,params.name,params.room);
        io.to(params.room).emit('updateUserList',users.getUserList(params.room))

        socket.emit('newMessage', generateMessage('Admin', 'welcome to the chat app')
    )
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name}  has joinned the room...`))
        callback(); 

    })


    socket.on('createMessage', function (newMsg,callback) {
        console.log('create Message', newMsg);
        io.emit('newMessage', generateMessage(newMsg.from, newMsg.text))
        callback('this is from server');
            
    })

    socket.on('createLocationMessage',function(coords){
        io.emit('newLocationMessage',generateLocationMessage(`Admin`,coords.latitude,coords.longitude))
        
    })
   
})


server.listen(PORT, () => {
    console.log('server started at', PORT)
})