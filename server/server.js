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


io.on('connection', (socket) => { //reserved keyword
    console.log('new user connected')
    socket.on('disconnect', () => { //reserved keyword
        console.log('dis-connected')
    })

    socket.emit('newMessage', generateMessage('Admin', 'welcome to the chat app')
    )
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User joinned...'))

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