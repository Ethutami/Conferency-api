"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = randomCode;
function randomCode(n) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < n; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        result += chars[randomIndex];
    }
    return result;
}
