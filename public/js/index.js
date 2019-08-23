var socket = io();
socket.on('connect', function () {
    console.log('Connected to server')
})
socket.on('disconnect', function () {
    console.log('disconnected from server')
})
socket.on('newMessage',function(newMessage){
    
    console.log('New Message is:', newMessage)
    var li = jQuery('<li> </li>')
    li.text (`${newMessage.from}: ${newMessage.text}`)
    jQuery('#messages').append(li)

})





/******JQUERY FUNCTIONS START FROM HERE***** */

jQuery('#message-form').on('submit',function(e){
    e.preventDefault()

    socket.emit('createMessage',{

        from: 'User',
        text: (jQuery('[name=message]').val()
        )
    },function(){

    })
})

var locationButton = $('#send-location');

locationButton.on('click',function()
{
    if(!navigator.geolocation){
        console.log('Geolocation not supported by browser')
    }

    else{
        navigator.geolocation.getCurrentPosition(function success(position){

           // console.log(position.coords.latitude,position.coords.longitude)

            socket.emit('createLocationMessage',{

                latitude:position.coords.latitude,
                longitude:position.coords.longitude
            })

        },
       
        function error(){

            alert('unable to fetch position')

        })
    }
})


socket.on('newLocationMessage',function(msg){
    
    console.log('Location is:', msg)
    var li = jQuery('<li> </li>')

   var a = jQuery('<a target="_blank">My Current Location</a>')
  li.text(`${msg.from}:`);
  a.attr('href',msg.url)
  li.append(a)
  jQuery('#messages').append(li)

})