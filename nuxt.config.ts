import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  css: ["~/assets/css/tailwind.css"],
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ["shadcn-nuxt", "nuxt-multi-tenancy"],
  multiTenancy: {
    tenantDynamicRoute: "tenant",
    rootDomains: ["localhost:3000"],
  },
  nitro: {
    storage: {
      redis: {
        driver: process.env.NODE_ENV === "production" ? "vercelKV" : "memory",
        url: process.env.REDIS_URL,
      },
    },
  },
  runtimeConfig: {
    REDIS_URL: process.env.REDIS_URL,
    public: {
      BASE_URL: process.env.BASE_URL,
    },
  },
});
