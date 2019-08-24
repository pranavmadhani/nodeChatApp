var socket = io();


socket.on('connect', function () {
    console.log('Connected to server')
})
socket.on('disconnect', function () {
    console.log('disconnected from server')
})
socket.on('newMessage',function(newMessage){
    
    let formattedTime = moment(newMessage.createdAt).format('h:mm a')

    console.log('New Message is:', newMessage)
    var li = jQuery('<li> </li>')
    li.text (`${newMessage.from}: ${formattedTime} ${newMessage.text}`)
    jQuery('#messages').append(li)

})





/******JQUERY FUNCTIONS START FROM HERE***** */

jQuery('#message-form').on('submit',function(e){
    e.preventDefault()

var messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage',{

        from: 'User',
        text: (messageTextbox.val()
        )
    },function(){

        messageTextbox.val('');

    })
})

var locationButton = $('#send-location');

locationButton.on('click',function()
{
    if(!navigator.geolocation){
        console.log('Geolocation not supported by browser')
    }

    else{
        locationButton.attr('disabled','disable').text('sending location....')

        navigator.geolocation.getCurrentPosition(function success(position){
           
            locationButton.removeAttr('disabled').text('Send location')
            socket.emit('createLocationMessage',{

                latitude:position.coords.latitude,
                longitude:position.coords.longitude
            })

        },
       
        function error(){
         
           locationButton.removeAttr('disabled').text('Send location')
            alert('unable to fetch position')

        })
    }
})


socket.on('newLocationMessage',function(msg){
   
    let formattedTime = moment(msg.createdAt).format('h:mm a')
    console.log('Location is:', msg)
    var li = jQuery('<li> </li>')

   var a = jQuery('<a target="_blank">My Current Location</a>')
  li.text(`${msg.from}: ${formattedTime}`);
  a.attr('href',msg.url)
  li.append(a)
  jQuery('#messages').append(li)

})