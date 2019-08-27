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
    
    socket.emit('newMessage',{
        from: "Admin",
        text: "Welcome to the chat app",
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('newMessage',{
        from: "Admin",
        text: "New user joined",
        createdAt: new Date().getTime()
    });

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

        // socket.broadcast.emit('newMessage',{
        //     from: "Andrew",
        //     text: "This should work"
        // });
    });
});

server.listen(port, () => console.log(`Listening on port ${port}`));