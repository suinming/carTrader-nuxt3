import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default defineEventHandler(async (event) => {
  const { id } = event.context.params;
  const car = await prisma.car.findUnique({
    where: {
      id: Number(id),
    },
  });

  if (!car) {
    throw createError({
      statusCode: 404,
      statusMessage: `car id ${id} is not found`,
    });
  }
  return car;
});
