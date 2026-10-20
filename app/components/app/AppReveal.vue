<script setup lang="ts">
/** Fades, slides and un-blurs its content the first time it scrolls into view. */
const props = withDefaults(defineProps<{
  as?: keyof HTMLElementTagNameMap
  delay?: number
  x?: number
  y?: number
  blur?: boolean
}>(), {
  as: 'div',
  delay: 0,
  x: 0,
  y: 28,
  blur: true,
})
</script>

<template>
  <Motion
    :as="(props.as as 'div')"
    :initial="{ opacity: 0, x: props.x, y: props.y, filter: props.blur ? 'blur(8px)' : 'blur(0px)' }"
    :while-in-view="{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }"
    :in-view-options="{ once: true, margin: '-80px' }"
    :transition="{ duration: 0.7, delay: props.delay, ease: [0.22, 1, 0.36, 1] }"
  >
    <slot />
  </Motion>
</template>
