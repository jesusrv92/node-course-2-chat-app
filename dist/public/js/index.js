var socket = io();
socket.on('connect', function () {
    console.log('Connected to the server');
});
socket.on('disconnect', function () {
    console.log('Disconnected from the server');
});
socket.on('newMessage', function (message) {
    console.log('New message', message);
    const li = document.createElement('li');
    li.textContent = `${message.from}: ${message.text}`;
    document.querySelector('#messages').append(li);
});
document.querySelector('#message-form').addEventListener('submit', function (e) {
    e.preventDefault();
    socket.emit('createMessage', {
        from: 'User',
        text: document.querySelector('[name=message]').value
    }, function () {
    });
});
//# sourceMappingURL=index.js.map