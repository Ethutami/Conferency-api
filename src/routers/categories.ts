import { Router } from "express";
import { GetAllCategoryController } from "../controllers/categories.controller";

const router = Router();

router.get("/", GetAllCategoryController);

export default router;