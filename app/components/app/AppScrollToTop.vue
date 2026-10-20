<script setup lang="ts">
const { y } = useWindowScroll()
const visible = computed(() => y.value > 400)
const reduced = usePreferredReducedMotion()

function toTop() {
  window.scrollTo({ top: 0, behavior: reduced.value === 'reduce' ? 'auto' : 'smooth' })
}

const hidden = { opacity: 0, y: 16, scale: 0.8 }
</script>

<template>
  <AnimatePresence>
    <Motion
      v-if="visible"
      as="button"
      type="button"
      aria-label="Scroll to top"
      class="fixed end-6 bottom-6 z-40 flex size-11 items-center justify-center rounded-full border border-default bg-default/80 text-muted shadow-lg backdrop-blur-md hover:border-primary hover:text-primary"
      :initial="hidden"
      :animate="{ opacity: 1, y: 0, scale: 1 }"
      :exit="hidden"
      :while-hover="{ y: -3 }"
      :while-press="{ scale: 0.92 }"
      :transition="{ duration: 0.25 }"
      @click="toTop"
    >
      <UIcon
        name="i-lucide-arrow-up"
        class="size-[18px]"
      />
    </Motion>
  </AnimatePresence>
</template>
