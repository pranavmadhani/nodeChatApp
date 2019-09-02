const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const math = require('mathjs');

const {
  generateMessage,
  generateLocationMessage,
  mathOperations
} = require('./utils/message');
const {
  isRealString
} = require('./utils/validation');
const {
  Users
} = require('./utils/users');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));






io.on('connection', (socket) => {
  console.log(`new user connected`);
  socket.on('join', (params, callback) => {
    
    if (!isRealString(params.name) || !isRealString(params.room.toLowerCase())) {
      return callback('Name and room name are required.');
    }
   
    let roomWithoutCaseSensitive = params.room.toString().toLowerCase();
    let allUsers = users.getUserList(roomWithoutCaseSensitive);
    allUsers.forEach(element => {
      if (element == params.name) {
        return callback('user with same name exists. Try another name');
      }
    });
    
    socket.join(roomWithoutCaseSensitive);
    users.removeUser(socket.id);

    users.addUser(socket.id, params.name, roomWithoutCaseSensitive);
    io.to(roomWithoutCaseSensitive).emit('updateUserList', users.getUserList(roomWithoutCaseSensitive));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(roomWithoutCaseSensitive).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
    callback();
  });

  socket.on('createMessage', (message, callback) => {
    console.log('createMessage', message);
    var user = users.getUser(socket.id);
    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }
    callback();
  });


  socket.on('performMath',(regex)=>{
   
    let result = regex;
    var user = users.getUser(socket.id);
    
    console.log('I will perform Math operations',result.text.toString())
    //socket.emit('performMath',mathOperations(result.text.toString()+"pranav"))
   io.to(user.room).emit('newMessage', generateMessage(user.name,mathOperations(result.text.toString())));

  });


  socket.on('createLocationMessage', (coords) => {
    var user = users.getUser(socket.id);
    io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
  });

  socket.on('disconnect', () => {
    var user = users.removeUser(socket.id);
    if (user) {
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
    }
  });
});
server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});