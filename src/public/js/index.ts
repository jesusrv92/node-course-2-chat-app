interface Socket {
    on(ev: string, cb: (...arg) => void): void;
    emit(ev: string, obj?: any): void;
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
});