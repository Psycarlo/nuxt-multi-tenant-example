<script setup lang="ts">
import type { PrimitiveProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import type { ButtonVariants } from ".";
import { Primitive } from "reka-ui";
import { cn } from "@/lib/utils";
import { buttonVariants } from ".";

type Props = {
  variant?: ButtonVariants["variant"];
  size?: ButtonVariants["size"];
  loading?: boolean;
  class?: HTMLAttributes["class"];
} & PrimitiveProps;

const props = withDefaults(defineProps<Props>(), {
  as: "button",
});
</script>

<template>
  <Primitive
    data-slot="button"
    :as="as"
    :as-child="asChild"
    :class="cn(buttonVariants({ variant, size }), props.class)"
  >
    <UiSpinner v-show="loading" class="size-4 animate-spin absolute" />
    <span class="flex items-center gap-1" :class="{ invisible: props.loading }">
      <slot />
    </span>
  </Primitive>
</template>
