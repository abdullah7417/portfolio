<script setup lang="ts">
/** Reveals text word by word, each word sliding up from behind a mask. */
const props = withDefaults(defineProps<{
  text: string
  as?: keyof HTMLElementTagNameMap
  delay?: number
  stagger?: number
  trigger?: 'mount' | 'view'
  wordClass?: string
}>(), {
  as: 'span',
  delay: 0,
  stagger: 0.08,
  trigger: 'view',
  wordClass: '',
})

const words = computed(() => props.text.split(' '))

const container = computed(() => ({
  hidden: {},
  visible: { transition: { delayChildren: props.delay, staggerChildren: props.stagger } },
}))

const word = {
  hidden: { y: '110%', opacity: 0, rotate: 4 },
  visible: { y: '0%', opacity: 1, rotate: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}
</script>

<template>
  <Motion
    :as="(props.as as 'div')"
    :aria-label="props.text"
    :variants="container"
    initial="hidden"
    :animate="props.trigger === 'mount' ? 'visible' : undefined"
    :while-in-view="props.trigger === 'view' ? 'visible' : undefined"
    :in-view-options="{ once: true, margin: '-80px' }"
  >
    <template
      v-for="(item, index) in words"
      :key="`${item}-${index}`"
    >
      <span
        class="-mb-[0.18em] inline-block overflow-hidden pb-[0.18em] align-bottom"
        aria-hidden="true"
      >
        <Motion
          as="span"
          class="inline-block"
          :class="props.wordClass"
          :variants="word"
        >
          {{ item }}
        </Motion>
      </span>
      <span
        v-if="index < words.length - 1"
        aria-hidden="true"
      >&nbsp;</span>
    </template>
  </Motion>
</template>
