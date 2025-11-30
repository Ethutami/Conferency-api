import { NextFunction, Request, Response } from "express";
import { createEventService, getAllEventsService, getEventByIdService } from "../services/events.service";

export async function getAllEventsController(req: Request, res: Response, next: NextFunction) {
    try {
        const events = await getAllEventsService();

        res.status(200).send({
            status: true,
            message: `Get all events success`,
            data: events,
        });
    } catch (err) {
        next(err);
    }
}

export async function getEventByIdController(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params
    try {
        const event = await getEventByIdService(id)

        if (!event) {
            throw new Error('Event id does not exist')
        }

        res.status(200).send({
            status: true,
            message: `Get events success`,
            data: event,
        });
    } catch (error) {
        next(error)
    }
}

export async function createEventController(req: Request, res: Response, next: NextFunction) {
    const { organizatorId } = req.params
    try {
        const response = await createEventService(organizatorId)
    } catch (error) {
    }
}