<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const is404 = computed(() => props.error.statusCode === 404)

useSeoMeta({
  title: () => (is404.value ? 'Page not found' : 'Something went wrong'),
  robots: 'noindex, nofollow',
})
</script>

<template>
  <UApp>
    <main class="relative flex min-h-screen items-center justify-center overflow-hidden bg-default px-6">
      <div
        class="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        aria-hidden="true"
      />
      <div class="relative text-center">
        <p class="text-gradient font-mono text-7xl font-bold md:text-9xl">
          {{ error.statusCode }}
        </p>
        <h1 class="mt-4 text-xl text-muted md:text-2xl">
          {{ is404 ? 'Oops! Page not found' : 'Something went wrong' }}
        </h1>
        <UButton
          class="mt-8 rounded-pill px-6"
          size="lg"
          icon="i-lucide-arrow-left"
          label="Return to Home"
          @click="clearError({ redirect: '/' })"
        />
      </div>
    </main>
  </UApp>
</template>
