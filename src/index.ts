import express, { Application, Request, Response, NextFunction } from "express";
import cors from 'cors';
import { FE_URL, PORT } from "./config";
import Categories from './routers/categories';

const port = PORT || 8090;
const app: Application = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log("Origin:", req.headers.origin); //cek origin request
    next();
});

const allowedOrigins = [
    'http://localhost:3000',
    'https://conferency-git-development-utamis-projects.vercel.app'
];

const corsOptions = {
    origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('CORS Not Allowed'));
        }
    },
    credentials: true
};

app.use(cors(corsOptions));
app.options('/api/categories', cors(corsOptions));

app.get('/', (req: Request, res: Response) => {
    res.status(200).json('Welcome to Conferency api');
});

app.use("/api/categories", Categories);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    res.status(400).json({
        success: false,
        message: err.message,
    });
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});