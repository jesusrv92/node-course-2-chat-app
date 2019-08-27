"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const socket_io_1 = __importDefault(require("socket.io"));
const http_1 = __importDefault(require("http"));
const app = express_1.default();
const publicPath = path_1.default.join(__dirname, '../public');
const port = process.env.PORT || 3000;
const server = http_1.default.createServer(app);
const io = socket_io_1.default(server);
app.use(express_1.default.static(publicPath));
io.on('connection', (socket) => {
    console.log('New user connected');
    socket.emit('newMessage', {
        from: "John",
        text: "See you then",
        createdAt: 123123,
    });
    socket.on('disconnect', () => {
        console.log('User was disconnected');
    });
    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
    });
});
server.listen(port, () => console.log(`Listening on port ${port}`));
//# sourceMappingURL=server.js.map