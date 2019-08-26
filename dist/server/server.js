"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const publicPath = path_1.default.join(__dirname, '../../public');
const port = process.env.PORT || 3000;
app.use(express_1.default.static(publicPath));
app.listen(port, () => console.log(`Listening on port ${port}`));
//# sourceMappingURL=server.js.map