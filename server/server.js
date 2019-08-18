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


io.on('connection',(socket)=>{

    console.log('new user connected')

    socket.on('disconnect',()=>{
        console.log('dis-connected') 
    })
})




server.listen(PORT,()=>{

    console.log('server started at',PORT)
})


