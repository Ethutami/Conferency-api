import { Router } from "express";
import { GetAllCategoryController, GetCategoryIdController } from "../controllers/categories.controller";

const router = Router();

router.get("/", GetAllCategoryController);
router.get("/:id", GetCategoryIdController)

export default router;