<script setup lang="ts">
/** Soft primary-colored glow that follows the mouse across the page. */
const enabled = useFinePointer()

const spring = { stiffness: 120, damping: 24, mass: 0.6 }
const x = useSpring(-1000, spring)
const y = useSpring(-1000, spring)
const background = useMotionTemplate`radial-gradient(520px circle at ${x}px ${y}px, color-mix(in oklab, var(--ui-primary) 9%, transparent), transparent 70%)`

useEventListener('pointermove', (event: PointerEvent) => {
  if (!enabled.value) return
  x.set(event.clientX)
  y.set(event.clientY)
}, { passive: true })
</script>

<template>
  <ClientOnly>
    <Motion
      v-if="enabled"
      as="div"
      aria-hidden="true"
      class="pointer-events-none fixed inset-0 z-30"
      :style="{ background }"
    />
  </ClientOnly>
</template>
