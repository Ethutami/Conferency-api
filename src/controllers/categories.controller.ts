import { NextFunction, Request, Response } from "express";
import { getAllCategoriesService } from "../services/categories.service";

export async function GetAllCategoryController(req: Request, res: Response, next: NextFunction
) {
    try {
        const categories = await getAllCategoriesService();
        res.status(200).send({
            message: `Get all categories success`,
            data: categories,
        });
    } catch (err) {
        next(err);
    }
}