import { NextFunction, Request, Response } from "express";
import { getAllCategoriesService, getCategoriesIdService } from "../services/categories.service";

export async function GetAllCategoryController(req: Request, res: Response, next: NextFunction) {
    try {
        const categories = await getAllCategoriesService();

        res.status(200).send({
            status: 'Success',
            message: `Get all categories success`,
            data: categories,
        });
    } catch (err) {
        next(err);
    }
}

export async function GetCategoryIdController(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
        const filter = await getCategoriesIdService(id);

        res.status(200).send({
            status: 'Success',
            message: `Filter category success`,
            data: filter,
        });
    } catch (err) {
        next(err);
    }
}
