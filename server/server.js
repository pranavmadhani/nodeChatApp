const path = require('path')
const express = require('express')
const http = require('http')
const app = express()

const publicPath = path.join(__dirname,'../public')
console.log(publicPath)
const PORT = process.env.PORT||3000;
const socketIO = require('socket.io')
var server = http.createServer(app)
var io = socketIO(server)
app.use(express.static(publicPath))


io.on('connection',(socket)=>{  //reserved keyword

    console.log('new user connected')

    // socket.emit('newEmail',{

    //     from:'server@admin.com',
    //     to: "pranavmadhani25@gmail.com",
    //     text:"Hi! GOod MOrning"
    // })

    socket.on('disconnect',()=>{  //reserved keyword
        console.log('dis-connected') 
    })

    socket.emit('createMessage',{
        from:"Server@msg.com",
        text: "hi server has a msg for you",
        time: new Date()


    })
    
    socket.on('createMessage',function(newMsg){
        console.log('create Message',newMsg);
       
        io.emit('newMessage',{
            from:newMsg.from,
            text: newMsg.text,
            time: new Date()
        })
    })

    socket.on('createEmail',function(dataOfEmail){
        console.log(dataOfEmail);
    })


})




server.listen(PORT,()=>{

    console.log('server started at',PORT)
})


