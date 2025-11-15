export default defineEventHandler(async (event) => {
  const tenant = getTenant(event);

  if (!tenant) {
    return createError({
      statusCode: 400,
      statusMessage: "Tenant not found in request",
    });
  }

  const storage = useStorage("redis");
  const tenantData = await storage.getItem(`tenant:${tenant}`);

  if (!tenantData) {
    return createError({
      statusCode: 404,
      statusMessage: "Tenant data not found",
    });
  }

  const typedData = tenantData as { description: string };

  return typedData;
});
