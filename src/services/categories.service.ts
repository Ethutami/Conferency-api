import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const BASE_ICON_URL = 'https://mznyfinmwapfnwytaooe.supabase.co/storage/v1/object/public/'

export const getAllCategoriesService = async () => {
  const categories = await prisma.categories.findMany();
  const categoriesFixedIconURL = categories.map((item) => ({ ...item, icon: `${BASE_ICON_URL}${item.icon}` }))

  return categoriesFixedIconURL
};

export const getCategoriesIdService = async (id: string) => {
  if (!id) throw new Error('Category ID is required');

  const events = await prisma.events.findMany({
    where: {
      event_categories: {
        some: {
          category_id: Number(id),
        },
      },
    },
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

