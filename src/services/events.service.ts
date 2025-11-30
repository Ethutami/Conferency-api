import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllEventsService = async () => {
  const events = await prisma.events.findMany({
    include: {
      event_categories: true,
      event_vouchers: true,
    },
    orderBy: {
      start_date: 'asc',
    },
  });
  return events
};

export const getEventByIdService = async (id: string) => {
  const event = await prisma.events.findUnique({
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
  return event
}

export async function createEventService(organizatorId: string) {
  console.log(organizatorId);


}