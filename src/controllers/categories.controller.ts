import { NextFunction, Request, Response } from "express";
import { getAllCategoriesService } from "../services/categories.service";

export async function GetAllCategoryController(req: Request, res: Response, next: NextFunction) {
    try {
        const categories = await getAllCategoriesService();

        const supabaseStorageUrl = 'https://mznyfinmwapfnwytaooe.supabase.co/storage/v1/object/public/';

        const categoriesWithIconUrl = categories.map(category => ({
            ...category,
            icon: supabaseStorageUrl + category.icon
        }));

        res.status(200).send({
            status: 'success',
            message: `Get all categories success`,
            data: categoriesWithIconUrl,
        });
    } catch (err) {
        next(err);
    }
}
