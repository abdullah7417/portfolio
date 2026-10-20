<script setup lang="ts">
/** 3D tilt that follows the pointer, with a soft glare. Inert on touch / reduced motion. */
const props = withDefaults(defineProps<{
  max?: number
  as?: keyof HTMLElementTagNameMap
}>(), {
  max: 8,
  as: 'div',
})

const enabled = useFinePointer()
const el = useTemplateRef<{ $el: HTMLElement }>('el')

const px = useMotionValue(0)
const py = useMotionValue(0)
const glareX = useMotionValue(50)
const glareY = useMotionValue(50)
const glareOpacity = useMotionValue(0)

const spring = { stiffness: 180, damping: 18, mass: 0.5 }
const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [props.max, -props.max]), spring)
const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-props.max, props.max]), spring)
const glare = useMotionTemplate`radial-gradient(360px circle at ${glareX}% ${glareY}%, color-mix(in oklab, var(--ui-primary) 14%, transparent), transparent 60%)`

function onMove(event: PointerEvent) {
  if (!enabled.value || !el.value) return
  const rect = el.value.$el.getBoundingClientRect()
  const x = (event.clientX - rect.left) / rect.width
  const y = (event.clientY - rect.top) / rect.height
  px.set(x - 0.5)
  py.set(y - 0.5)
  glareX.set(x * 100)
  glareY.set(y * 100)
  glareOpacity.set(1)
}

function onLeave() {
  px.set(0)
  py.set(0)
  glareOpacity.set(0)
}
</script>

<template>
  <Motion
    ref="el"
    :as="(props.as as 'div')"
    class="relative"
    :style="enabled ? { rotateX, rotateY, transformPerspective: 900, transformStyle: 'preserve-3d' } : undefined"
    @pointermove="onMove"
    @pointerleave="onLeave"
  >
    <slot />
    <Motion
      v-if="enabled"
      as="span"
      aria-hidden="true"
      class="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
      :style="{ background: glare, opacity: glareOpacity }"
    />
  </Motion>
</template>
