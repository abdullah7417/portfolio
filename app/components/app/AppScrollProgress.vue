<script setup lang="ts">
const { scrollYProgress } = useScroll()
const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })
</script>

<template>
  <Motion
    as="div"
    aria-hidden="true"
    class="fixed inset-x-0 top-0 z-[60] h-0.5"
    :style="{ scaleX, transformOrigin: '0%' }"
  >
    <div class="bg-gradient-primary h-full w-full" />
  </Motion>
</template>
