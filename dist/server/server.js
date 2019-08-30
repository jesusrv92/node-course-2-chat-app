"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const message_1 = require("./utils/message");
const validation_1 = require("./utils/validation");
const users_1 = require("./utils/users");
const app = express_1.default();
const publicPath = path_1.default.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const server = http_1.default.createServer(app);
const io = socket_io_1.default(server);
const users = new users_1.Users();
app.use(express_1.default.static(publicPath));
io.on('connection', (socket) => {
    console.log('New user connected');
    socket.on('disconnect', () => {
        const user = users.removeUser(socket.id);
        if (user) {
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', message_1.generateMessage('Admin', `${user.name} has left.`));
        }
    });
    socket.on('createMessage', (message, callback) => {
        const user = users.getUser(socket.id);
        if (user && validation_1.isRealString(message.text)) {
            io.to(user.room).emit('newMessage', message_1.generateMessage(user.name, message.text));
        }
        callback();
    });
    socket.on('createLocationMessage', (coords) => {
        const user = users.getUser(socket.id);
        if (user) {
            io.to(user.room).emit('newLocationMessage', message_1.generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }
    });
    socket.on('join', (params, callback) => {
        if (!validation_1.isRealString(params.name || !validation_1.isRealString(params.room))) {
            return callback('Name and room name are required');
        }
        socket.join(params.room);
        users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));
        socket.emit('newMessage', message_1.generateMessage('Admin', 'Welcome to the chat app'));
        socket.broadcast.to(params.room).emit('newMessage', message_1.generateMessage('Admin', `${params.name} has joined.`));
        callback();
    });
});
server.listen(port, () => console.log(`Listening on port ${port}`));
//# sourceMappingURL=server.js.map