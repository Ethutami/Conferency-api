import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export const getAllCategoriesService = async () => {
  const categories = await prisma.categories.findMany();
  return categories
};
