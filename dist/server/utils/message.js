"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateMessage(from, text) {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    };
}
exports.generateMessage = generateMessage;
;
function generateLocationMessage(from, lat, lon) {
    return {
        from,
        url: `https://www.google.com/maps/@${lat},${lon}z`,
        createdAt: new Date().getTime()
    };
}
exports.generateLocationMessage = generateLocationMessage;
;
//# sourceMappingURL=message.js.map