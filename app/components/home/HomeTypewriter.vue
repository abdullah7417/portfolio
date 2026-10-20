<script setup lang="ts">
/** Types, holds, and deletes each phrase in turn. Static under reduced motion. */
const props = defineProps<{ phrases: string[] }>()

const reduced = usePreferredReducedMotion()
const text = ref(props.phrases[0] ?? '')
let timer: ReturnType<typeof setTimeout> | undefined

function run(index: number, length: number, deleting: boolean) {
  const phrase = props.phrases[index] ?? ''
  text.value = phrase.slice(0, length)

  if (!deleting && length === phrase.length) {
    timer = setTimeout(() => run(index, length - 1, true), 1800)
  }
  else if (deleting && length === 0) {
    timer = setTimeout(() => run((index + 1) % props.phrases.length, 1, false), 75)
  }
  else {
    timer = setTimeout(() => run(index, length + (deleting ? -1 : 1), deleting), deleting ? 35 : 75)
  }
}

onMounted(() => {
  if (reduced.value === 'reduce' || props.phrases.length === 0) return
  run(0, 0, false)
})

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <span>
    <span class="sr-only">{{ props.phrases.join(', ') }}</span>
    <span
      class="font-mono"
      aria-hidden="true"
    >{{ text }}</span>
    <span
      v-if="reduced !== 'reduce'"
      class="animate-pulse text-primary"
      aria-hidden="true"
    >|</span>
  </span>
</template>
