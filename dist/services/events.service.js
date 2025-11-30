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
exports.getEventByIdService = exports.getAllEventsService = void 0;
exports.createEventService = createEventService;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getAllEventsService = () => __awaiter(void 0, void 0, void 0, function* () {
    const events = yield prisma.events.findMany({
        include: {
            event_categories: true,
            event_vouchers: true,
        },
        orderBy: {
            start_date: 'asc',
        },
    });
    return events;
});
exports.getAllEventsService = getAllEventsService;
const getEventByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const event = yield prisma.events.findUnique({
        where: { id },
        include: {
            organizator: {
                select: {
                    id: true,
                    organizator_name: true,
                },
            },
            event_categories: true,
            event_vouchers: true,
        },
    });
    return event;
});
exports.getEventByIdService = getEventByIdService;
function createEventService(organizatorId) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(organizatorId);
    });
}
