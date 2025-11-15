import { z } from "zod/v4";

const TenantPostSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.string().min(1).max(100),
});

export default defineEventHandler(async (event) => {
  const validatedBody = await readValidatedBody(
    event,
    TenantPostSchema.safeParse
  );

  if (validatedBody.error) {
    return createError({
      statusCode: 400,
      statusMessage: "Invalid request body",
    });
  }

  const { name, description } = validatedBody.data;

  const storage = useStorage("redis");

  const existingTenant = await storage.hasItem(`tenant:${name}`);

  if (existingTenant) {
    return createError({
      statusCode: 409,
      statusMessage: "Tenant already exists",
    });
  }

  await storage.setItem(`tenant:${name}`, { description });

  return { name, description };
});
