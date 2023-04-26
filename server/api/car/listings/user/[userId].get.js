import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default defineEventHandler((event) => {
  const { userId } = event.context.params;
  return prisma.car.findMany({
    where: {
      listerId: userId,
    },
    select: {
      name: true,
      id: true,
      image: true,
      price: true,
    },
  });
});
