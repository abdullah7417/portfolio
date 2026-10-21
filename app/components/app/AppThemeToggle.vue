<script setup lang="ts">
const colorMode = useColorMode()
const isDark = computed(() => colorMode.value === 'dark')

function toggle() {
  colorMode.preference = isDark.value ? 'light' : 'dark'
}
</script>

<template>
  <ClientOnly>
    <button
      type="button"
      class="flex size-9 items-center justify-center rounded-pill border border-default bg-muted/50 text-muted transition-colors hover:border-primary/40 hover:text-primary focus-visible:outline-2 focus-visible:outline-primary"
      :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
      @click="toggle"
    >
      <UIcon
        :name="isDark ? 'i-lucide-sun' : 'i-lucide-moon'"
        class="size-[18px]"
      />
    </button>
    <template #fallback>
      <span
        class="block size-9"
        aria-hidden="true"
      />
    </template>
  </ClientOnly>
</template>
