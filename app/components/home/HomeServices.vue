<script setup lang="ts">
import { services } from '~/data/portfolio'
</script>

<template>
  <div class="mt-20">
    <AppReveal
      :y="12"
      :blur="false"
    >
      <h3 class="mb-6 flex items-center gap-3 font-mono text-sm text-primary">
        <span
          class="h-px w-8 bg-primary/60"
          aria-hidden="true"
        />
        What I do
      </h3>
    </AppReveal>

    <ul class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <AppReveal
        v-for="(service, index) in services"
        :key="service.title"
        as="li"
        :delay="(index % 3) * 0.12"
      >
        <AppTiltCard
          :max="6"
          class="glass-card group h-full p-6 transition-colors duration-300 hover:border-primary/30"
        >
          <div class="mb-4 flex size-10 items-center justify-center rounded-xl bg-primary/10 transition-transform duration-300 group-hover:scale-110">
            <UIcon
              :name="service.icon"
              class="size-5 text-primary"
            />
          </div>
          <h4 class="text-lg font-semibold text-highlighted transition-colors group-hover:text-primary">
            {{ service.title }}
          </h4>
          <p class="mt-2 text-sm leading-relaxed text-muted">
            {{ service.description }}
          </p>
        </AppTiltCard>
      </AppReveal>
    </ul>
  </div>
</template>
