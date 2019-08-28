"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const message_1 = __importDefault(require("./utils/message"));
const app = express_1.default();
const publicPath = path_1.default.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const server = http_1.default.createServer(app);
const io = socket_io_1.default(server);
app.use(express_1.default.static(publicPath));
io.on('connection', (socket) => {
    console.log('New user connected');
    socket.emit('newMessage', message_1.default('Admin', 'Welcome to the chat app'));
    socket.broadcast.emit('newMessage', message_1.default('Admin', 'New user joined'));
    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        io.emit('newMessage', message_1.default(message.from, message.text));
        callback('This is from the server');
    });
});
server.listen(port, () => console.log(`Listening on port ${port}`));
//# sourceMappingURL=server.js.map