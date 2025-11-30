import { Router } from "express";
import { createEventController, getAllEventsController, getEventByIdController } from "../controllers/events.controller";

const router = Router();

router.get("/", getAllEventsController);
router.get("/:id", getEventByIdController);
router.post('/:organizatorId', createEventController)

export default router;