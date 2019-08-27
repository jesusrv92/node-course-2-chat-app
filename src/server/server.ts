declare const __dirname;
import path from 'path';
import express from 'express';
import socketIO from 'socket.io';
import http from 'http';

const app = express();
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        io.emit('newMessage',{
            from: message.from,
            text: message.text,
            createdAt: new Date().getTime()
        });
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));