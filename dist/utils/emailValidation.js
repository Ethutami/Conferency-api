"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = validateEmail;
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase());
}
