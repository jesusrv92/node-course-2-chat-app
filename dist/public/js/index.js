var socket = io();
// socket events
socket.on('connect', function () {
    console.log('Connected to the server');
});
socket.on('disconnect', function () {
    console.log('Disconnected from the server');
});
socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = document.querySelector('#message-template').innerHTML;
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    document.querySelector('#messages').insertAdjacentHTML('beforeend', html);
});
socket.on('newLocationMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = document.querySelector('#location-message-template').innerHTML;
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });
    document.querySelector('#messages').insertAdjacentHTML('beforeend', html);
});
// event listeners
document.querySelector('#message-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var messageTextbox = document.querySelector('[name=message]');
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.value
    }, function () {
        messageTextbox.value = '';
    });
});
var locationButton = document.querySelector('#send-location');
locationButton.addEventListener('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }
    locationButton.disabled = true;
    locationButton.textContent = 'Sending Location...';
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.disabled = false;
        locationButton.textContent = 'Send Location';
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        locationButton.disabled = false;
        locationButton.textContent = 'Send Location';
        alert('Unable to fetch location.');
    });
});
//# sourceMappingURL=index.js.map