var socket = io();
socket.on('connect', function () {
    console.log('Connected to the server');
});
socket.on('disconnect', function () {
    console.log('Disconnected from the server');
});
socket.on('newMessage', function (message) {
    console.log('New message', message);
    var li = document.createElement('li');
    li.textContent = `${message.from}: ${message.text}`;
    document.querySelector('#messages').append(li);
});
socket.on('newLocationMessage', function (message) {
    var li = document.createElement('li');
    var a = document.createElement('a');
    a.textContent = 'My current location';
    a.target = '_blank';
    a.href = message.url;
    li.textContent = `${message.from}: `;
    li.append(a);
    document.querySelector('#messages').append(li);
});
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