import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler((event) => {
  const { city } = event.context.params;
  // minPrice and maxPrice are string!!
  const { make, minPrice, maxPrice } = getQuery(event);

  const filter = {
    city: city.toLowerCase(),
  };
  if (make) {
    filter.make = make;
  }
  if (minPrice || maxPrice) {
    filter.price = {};
  }
  if (minPrice) {
    filter.price.gte = parseInt(minPrice);
  }
  if (maxPrice) {
    filter.price.lte = parseInt(maxPrice);
  }
  return prisma.car.findMany({
    where: filter,
  });
});
