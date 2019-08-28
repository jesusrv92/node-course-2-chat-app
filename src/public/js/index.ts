interface Socket {
    on(ev: string, cb: (...arg) => void): void;
    emit(ev: string, obj?: object, cb?: (...args) => void): void;
}
interface Input extends Element{
    value: string | number
}
declare const io: () => Socket;
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

document.querySelector('#message-form').addEventListener('submit', function(e){
    e.preventDefault();
    socket.emit('createMessage',{
        from:'User',
        text: (document.querySelector('[name=message]') as Input).value
    }, function(){
    });
});