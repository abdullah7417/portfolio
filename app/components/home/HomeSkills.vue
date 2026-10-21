<script setup lang="ts">
import { skillGroups } from '~/data/portfolio'
</script>

<template>
  <section
    id="skills"
    class="section-padding"
  >
    <div class="mx-auto max-w-6xl">
      <AppSectionHeading
        eyebrow="02. Skills"
        title="Technologies I work with"
      />

      <div class="grid gap-8 md:grid-cols-3">
        <AppReveal
          v-for="(group, groupIndex) in skillGroups"
          :key="group.title"
          :delay="groupIndex * 0.12"
        >
          <AppTiltCard class="glass-card h-full p-6 transition-colors duration-300 hover:border-primary/30">
            <div class="mb-6 flex items-center gap-3">
              <div class="flex size-10 items-center justify-center rounded-xl bg-primary/10">
                <UIcon
                  :name="group.icon"
                  class="size-5 text-primary"
                />
              </div>
              <h3 class="text-lg font-semibold text-highlighted">
                {{ group.title }}
              </h3>
            </div>
            <ul class="flex flex-wrap gap-2">
              <Motion
                v-for="(skill, index) in group.skills"
                :key="skill"
                as="li"
                class="cursor-default rounded-pill border border-default bg-muted/60 px-3 py-1.5 font-mono text-xs text-default/90 transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-primary md:text-sm"
                :initial="{ opacity: 0, scale: 0.8, y: 8 }"
                :while-in-view="{ opacity: 1, scale: 1, y: 0 }"
                :in-view-options="{ once: true, margin: '-40px' }"
                :while-hover="{ y: -3 }"
                :transition="{ type: 'spring', stiffness: 320, damping: 22, delay: groupIndex * 0.12 + index * 0.05 + 0.15 }"
              >
                {{ skill }}
              </Motion>
            </ul>
          </AppTiltCard>
        </AppReveal>
      </div>
    </div>
  </section>
</template>
