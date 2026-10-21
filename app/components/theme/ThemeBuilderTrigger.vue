<script setup lang="ts">
const { open, toggle } = useThemeBuilder()
</script>

<template>
  <UTooltip
    :text="open ? 'Close theme builder' : 'Customize theme'"
    :content="{ side: 'left' }"
  >
    <button
      type="button"
      class="fixed top-1/2 z-[55] flex -translate-y-1/2 items-center justify-center rounded-s-2xl border border-e-0 border-default bg-elevated/80 px-2.5 py-3.5 text-primary shadow-lg backdrop-blur-md transition-[right,color,background-color] duration-200 hover:bg-elevated focus-visible:outline-2 focus-visible:outline-primary cursor-pointer"
      :class="open ? 'right-0 max-sm:hidden sm:right-96' : 'right-0'"
      :aria-label="open ? 'Close theme builder' : 'Customize theme'"
      :aria-expanded="open"
      @click="toggle"
    >
      <UIcon
        :name="open ? 'i-lucide-x' : 'i-lucide-palette'"
        class="size-5"
      />
    </button>
  </UTooltip>
</template>
