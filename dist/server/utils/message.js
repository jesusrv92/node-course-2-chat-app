"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
function generateMessage(from, text) {
    return {
        from,
        text,
        createdAt: moment_1.default().valueOf()
    };
}
exports.generateMessage = generateMessage;
;
function generateLocationMessage(from, lat, lon) {
    return {
        from,
        url: `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`,
        createdAt: moment_1.default().valueOf()
    };
}
exports.generateLocationMessage = generateLocationMessage;
;
//# sourceMappingURL=message.js.map