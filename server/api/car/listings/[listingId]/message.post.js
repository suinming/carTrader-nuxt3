import Joi from "joi";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const schema = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  name: Joi.string().required(),
  message: Joi.string().min(20).required(),
});
export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  // listingId is a string now!!
  const { listingId } = event.context.params;
  const { error } = schema.validate(body);
  if (error) {
    throw createError({
      statusCode: 404,
      statusMessage: error.message,
    });
  }
  return prisma.message.create({
    data: {
      message: body.message,
      email: body.email,
      phone: body.phone,
      name: body.name,
      listingId: parseInt(listingId),
    },
  });
});
