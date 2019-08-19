var socket = io();

socket.on('connect', function () {
    console.log('Connected to server')

    // socket.emit('createEmail',{
    //     To:"prxyz@gmail.com",
    //     text:"DBZ is back"
    // })
    socket.emit('newMessage',{
        To:"pranavmadhani25@gmail.com",
        text:"message custom emit"
    })
})

socket.on('newEmail',function(email){

    console.log('Email:', email)

})

socket.on('disconnect', function () {

    console.log('disconnected from server')
})


socket.on('createMessage',function(newMessage){

    console.log('Message', newMessage)

})