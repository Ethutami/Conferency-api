"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config");
const categories_1 = __importDefault(require("./routers/categories"));
const port = config_1.PORT || 8090;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api/categories", categories_1.default);
app.get('/', (req, res) => {
    res.status(200).json('Welcome to Conferency api');
});
app.use((err, req, res, next) => {
    res.status(400).json({
        success: false,
        message: err.message,
    });
});
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
