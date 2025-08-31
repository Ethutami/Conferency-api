import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const BASE_ICON_URL = 'https://mznyfinmwapfnwytaooe.supabase.co/storage/v1/object/public/'

export const getAllCategoriesService = async () => {
  const categories = await prisma.categories.findMany();
  const categoriesFixedIconURL = categories.map((item) => ({ ...item, icon: `${BASE_ICON_URL}${item.icon}` }))

  return categoriesFixedIconURL
};
