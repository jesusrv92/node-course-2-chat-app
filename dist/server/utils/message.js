"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function generateMessage(from, text) {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    };
}
exports.default = generateMessage;
;
//# sourceMappingURL=message.js.map