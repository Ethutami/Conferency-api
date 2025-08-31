import express, { Application, Request, Response, NextFunction } from "express";
import cors from 'cors'
import { FE_URL, PORT } from "./config";

import Categories from './routers/categories'

const port = PORT || 8090;
const app: Application = express();

app.use(express.json());

const allowedOrigins = [
    'http://localhost:3000',
    'https://conferency-git-development-utamis-projects.vercel.app'
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('CORS Not Allowed'));
        }
    },
    credentials: true, // jika pakai cookies atau session
}));


app.use("/api/categories", Categories);

app.get('/', (req: Request, res: Response) => {
    res.status(200).json('Welcome to Conferency api')
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(400).json({
        success: false,
        message: err.message,
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});