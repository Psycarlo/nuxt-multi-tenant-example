<template>
  <main class="min-h-screen flex flex-col items-center justify-center">
    <form @submit.prevent="() => execute()" class="min-w-60">
      <UiFieldGroup>
        <UiFieldSet>
          <UiField>
            <UiFieldLabel>Name</UiFieldLabel>
            <UiInput v-model="name" />
          </UiField>
          <UiField>
            <UiFieldLabel>Description</UiFieldLabel>
            <UiInput v-model="description" />
          </UiField>
          <UiButton :loading="pending" :disabled="!name || !description">
            Create
          </UiButton>
        </UiFieldSet>
      </UiFieldGroup>
    </form>
  </main>
</template>
<script setup lang="ts">
import { toast } from "vue-sonner";

const runtimeConfig = useRuntimeConfig();

const name = ref("");
const description = ref("");

const { execute, pending } = useFetch("/api/tenant", {
  method: "POST",
  body: {
    name,
    description,
  },
  immediate: false,
  watch: false,
  onResponse({ response }) {
    if (response.ok) {
      const url = new URL(runtimeConfig.public.BASE_URL);
      url.hostname = `${name.value}.${url.hostname}`;
      return navigateTo(url.toString(), { external: true });
    }
  },
  onResponseError({ response }) {
    if (response.status === 409) {
      toast.error("Tenant already exists");
    } else {
      toast.error("An error occurred while creating the tenant");
    }

    console.log("HERE2");
  },
});
</script>
