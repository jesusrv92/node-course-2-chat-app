interface ExtendedElements extends Element {
    value?: string | number,
    disabled?: boolean
}
type Moment = typeof import('moment');
type Socket = typeof import('socket.io');
declare const moment: Moment;
declare const io: Socket;
declare const Mustache: any;
var socket = io();

function scrollToBottom() {
    // Selectors
    var messages = document.querySelector('#messages');
    var newMessage = messages.lastElementChild;
    // Heights
    var clientHeight = messages.clientHeight;
    var scrollTop = messages.scrollTop;
    var scrollHeight = messages.scrollHeight;
    var newMessageHeight = newMessage.clientHeight;
    var lastMessageHeight = newMessage.previousElementSibling ? newMessage.previousElementSibling.clientHeight : 0;

    if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
        messages.scrollTop = scrollHeight;
    }
}
function deparam(uri: string) {
    if (uri === undefined) {
        uri = window.location.search;
    }
    var queryString = {};
    uri.replace(
        new RegExp(
            "([^?=&]+)(=([^&#]*))?", "g"),
        function ($0, $1, $2, $3) {
            queryString[$1] = decodeURIComponent($3.replace(/\+/g, '%20'));
            return $0;
        }
    );
    return queryString;
}

// socket events
socket.on('connect', function () {
    var params = deparam(location.search);
    socket.emit('join', params, function (err) {
        if (err) {
            alert(err);
            window.location.href = '/'
        } else {
            console.log('No error');
        }
    });
});
socket.on('disconnect', function () {
    console.log('Disconnected from the server');
});
socket.on('updateUserList', function (users: string[]) {
    const ol = document.createElement('ol');
    users.forEach(function (user) {
        const li = document.createElement('li');
        li.textContent = user;
        ol.append(li);
    });
    document.querySelector('#users').innerHTML = ol.outerHTML;
    // console.log(users);
})

socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = document.querySelector('#message-template').innerHTML;
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });
    document.querySelector('#messages').insertAdjacentHTML('beforeend', html);
    scrollToBottom();
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
    scrollToBottom();
});

// event listeners
document.querySelector('#message-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var messageTextbox: ExtendedElements = document.querySelector('[name=message]');
    
    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.value
    }, function () {
        messageTextbox.value = '';
    });
});

var locationButton: ExtendedElements = document.querySelector('#send-location');
locationButton.addEventListener('click', function () {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }
    locationButton.disabled = true;
    locationButton.textContent = 'Sending Location...'
    navigator.geolocation.getCurrentPosition(function (position) {
        locationButton.disabled = false;
        locationButton.textContent = 'Send Location'
        socket.emit('createLocationMessage', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    }, function () {
        locationButton.disabled = false;
        locationButton.textContent = 'Send Location'
        alert('Unable to fetch location.')
    })
})