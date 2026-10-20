<script setup lang="ts">
import { animate } from 'motion-v'

const props = withDefaults(defineProps<{
  to: number
  suffix?: string
  delay?: number
}>(), {
  suffix: '',
  delay: 0,
})

const el = useTemplateRef<HTMLElement>('el')
const inView = useInView(el, { once: true, margin: '-60px' })
const reduced = usePreferredReducedMotion()
const display = ref(`0${props.suffix}`)

watch(inView, (visible) => {
  if (!visible) return
  if (reduced.value === 'reduce') {
    display.value = `${props.to}${props.suffix}`
    return
  }
  animate(0, props.to, {
    duration: 1.6,
    delay: props.delay,
    ease: [0.22, 1, 0.36, 1],
    onUpdate: value => (display.value = `${Math.round(value)}${props.suffix}`),
  })
})
</script>

<template>
  <span
    ref="el"
    :aria-label="`${props.to}${props.suffix}`"
  >{{ display }}</span>
</template>
