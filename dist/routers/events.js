"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const events_controller_1 = require("../controllers/events.controller");
const router = (0, express_1.Router)();
router.get("/", events_controller_1.getAllEventsController);
router.get("/:id", events_controller_1.getEventByIdController);
router.post('/:organizatorId', events_controller_1.createEventController);
exports.default = router;
