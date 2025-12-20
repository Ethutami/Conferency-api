import { Router } from "express";
import { GetAllCategoryController, GetCategoryIdController } from "../controllers/categories.controller";

const router = Router();

router.get("/", GetAllCategoryController);
router.post("/:id", GetCategoryIdController)

export default router;