import { Router } from "express";
import {
    createOrganizatorController,
    deleteOrganizatorController, getAllOrganizatorController,
    getOrganizatorController, updateOrganizatorController
} from "../controllers/organizator.controller";

const router = Router();

router.get("/", getAllOrganizatorController);
router.post("/", createOrganizatorController)
router.get("/:id", getOrganizatorController)
router.put("/:id", updateOrganizatorController)
router.delete("/:id", deleteOrganizatorController)

export default router;