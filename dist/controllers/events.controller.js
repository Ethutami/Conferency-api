"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllEventsController = getAllEventsController;
exports.getEventByIdController = getEventByIdController;
exports.createEventController = createEventController;
const events_service_1 = require("../services/events.service");
function getAllEventsController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const events = yield (0, events_service_1.getAllEventsService)();
            res.status(200).send({
                status: true,
                message: `Get all events success`,
                data: events,
            });
        }
        catch (err) {
            next(err);
        }
    });
}
function getEventByIdController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        try {
            const event = yield (0, events_service_1.getEventByIdService)(id);
            if (!event) {
                throw new Error('Event id does not exist');
            }
            res.status(200).send({
                status: true,
                message: `Get events success`,
                data: event,
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function createEventController(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { organizatorId } = req.params;
        try {
            const response = yield (0, events_service_1.createEventService)(organizatorId);
        }
        catch (error) {
        }
    });
}
