<script setup lang="ts">
import { profile } from '~/data/portfolio'

/** Bottom-right action stack: scroll-to-top, then quick-contact buttons (WhatsApp above LinkedIn). */
const contacts = ['WhatsApp', 'LinkedIn']
  .map(label => profile.socials.find(social => social.label === label))
  .filter(social => social !== undefined)

const hidden = { opacity: 0, y: 16, scale: 0.8 }
</script>

<template>
  <div class="fixed end-6 bottom-6 z-40 flex flex-col items-center gap-3">
    <AppScrollToTop />
    <Motion
      v-for="(social, index) in contacts"
      :key="social.label"
      as="a"
      :href="social.href"
      target="_blank"
      rel="noopener noreferrer"
      :aria-label="`${social.label} (opens in a new tab)`"
      :title="social.label"
      class="bg-gradient-primary flex size-12 items-center justify-center rounded-full text-inverted shadow-lg transition-shadow duration-300 hover:shadow-glow focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      :initial="hidden"
      :animate="{ opacity: 1, y: 0, scale: 1 }"
      :while-hover="{ y: -3 }"
      :while-press="{ scale: 0.92 }"
      :transition="{ duration: 0.3, delay: 0.6 + index * 0.1 }"
    >
      <UIcon
        :name="social.icon"
        class="size-5"
      />
    </Motion>
  </div>
</template>
