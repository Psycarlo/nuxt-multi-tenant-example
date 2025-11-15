<template>
  <main class="min-h-screen flex flex-col items-center justify-center">
    <article v-if="data && exists" class="flex flex-col gap-3">
      <h1 class="text-2xl font-bold">{{ tenant }}</h1>
      <p>{{ data.description }}</p>
      <UiButton
        variant="ghost"
        @click="navigateTo($config.public.BASE_URL, { external: true })"
      >
        Back
      </UiButton>
    </article>
    <div v-else class="flex flex-col gap-3 items-center">
      <h1 class="text-2xl font-bold">{{ tenant }} not found</h1>
      <p>Please check the tenant name in the URL.</p>
      <UiButton
        @click="navigateTo($config.public.BASE_URL, { external: true })"
      >
        Create {{ tenant }}
      </UiButton>
    </div>
  </main>
</template>

<script setup lang="ts">
const tenant = useTenant();

const exists = useState(`tenant-${tenant}`, () => false);

const { data } = await useFetch("/api/tenant", {
  method: "GET",
  onResponse({ response }) {
    exists.value = response.status === 200;
  },
});
</script>
