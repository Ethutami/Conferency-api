import express, { Application, Request, Response, NextFunction } from "express";
import cors from 'cors'
import { FE_URL, PORT } from "./config";

import Categories from './routers/categories'

const port = PORT || 8090;
const app: Application = express();

app.use(express.json());

app.use(cors({
    origin: FE_URL
}));

app.use(cors());

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