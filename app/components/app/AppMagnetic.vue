<script setup lang="ts">
/** Pulls its content slightly toward the pointer. Inert on touch / reduced motion. */
const props = withDefaults(defineProps<{ strength?: number }>(), { strength: 0.35 })

const enabled = useFinePointer()
const el = useTemplateRef<{ $el: HTMLElement }>('el')

const spring = { stiffness: 220, damping: 16, mass: 0.4 }
const x = useSpring(0, spring)
const y = useSpring(0, spring)

function onMove(event: PointerEvent) {
  if (!enabled.value || !el.value) return
  const rect = el.value.$el.getBoundingClientRect()
  x.set((event.clientX - (rect.left + rect.width / 2)) * props.strength)
  y.set((event.clientY - (rect.top + rect.height / 2)) * props.strength)
}

function onLeave() {
  x.set(0)
  y.set(0)
}
</script>

<template>
  <Motion
    ref="el"
    as="div"
    class="inline-block"
    :style="{ x, y }"
    @pointermove="onMove"
    @pointerleave="onLeave"
  >
    <slot />
  </Motion>
</template>
