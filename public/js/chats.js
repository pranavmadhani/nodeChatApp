var socket = io();
let counter = 0;

    

function scrollToBottom()
{
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight+scrollTop+newMessageHeight+lastMessageHeight >= scrollHeight)
    {
            messages.scrollTop(scrollHeight);
    }
}




socket.on('connect', function () {
    
    var params = jQuery.deparam(window.location.search);
    
    console.log('Connected to server')

    socket.emit('join',params,function(err){
        if(err)
        {
         alert(err);
         window.location.href='/';    
        }
        else{

            console.log('no error')
        }
        
    })    
    


})
socket.on('disconnect', function () {
    console.log('disconnected from server')
})



socket.on('updateUserList',function(users){
    var ol = jQuery('<ol></ol>');
   
    users.forEach(function(user){
        ol.append(jQuery('<li></li>').text(user))
    });
    jQuery('#users').html(ol);

     console.log(users);
})


socket.on('newMessage', function (newMessage) {

    let formattedTime = moment(newMessage.createdAt).format('h:mm a')
   
    var template = jQuery('#message-template').html();
  
    let html = Mustache.render(template,{
        text:newMessage.text,
        from: newMessage.from,
        createdAt: formattedTime
    }
       
        )
    jQuery('#messages').append(html)
    scrollToBottom();
   

})






/******JQUERY FUNCTIONS START FROM HERE***** */

jQuery('#message-form').on('submit', function (e) {
    e.preventDefault()

    var messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {

        from: 'User',
        text: (messageTextbox.val())
    }, function () {

        messageTextbox.val('');

    })
})

var locationButton = $('#send-location');

locationButton.on('click', function () {
    if (!navigator.geolocation) {
        console.log('Geolocation not supported by browser')
    } else {
        locationButton.attr('disabled', 'disable').text('sending location....')

        navigator.geolocation.getCurrentPosition(function success(position) {

                locationButton.removeAttr('disabled').text('Send location')
                socket.emit('createLocationMessage', {

                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                })

            },

            function error() {

                locationButton.removeAttr('disabled').text('Send location')
                alert('unable to fetch position')

            })
    }
})


socket.on('newLocationMessage', function (msg) {



    let formattedTime = moment(msg.createdAt).format('h:mm a')
    console.log('Location is:', msg)


    var template = jQuery('#location-message-template').html();
  
    let html = Mustache.render(template,{
        from:msg.from,
        createdAt: formattedTime,
        url:msg.url
    }
       
        )
    jQuery('#messages').append(html)
    scrollToBottom();

    // var li = jQuery('<li> </li>')

    // var a = jQuery('<a target="_blank">My Current Location</a>')
    // li.text(`${msg.from}: ${formattedTime}`);
    // a.attr('href', msg.url)
    // li.append(a)
    // jQuery('#messages').append(li)

})