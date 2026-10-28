<script setup lang="ts">
import { profile } from '~/data/portfolio'
</script>

<template>
  <section
    id="about"
    class="section-padding"
  >
    <div class="mx-auto max-w-6xl">
      <AppSectionHeading
        eyebrow="01. About Me"
        title="Get to know me"
      />

      <div class="grid items-center gap-12 md:grid-cols-3">
        <AppReveal
          :x="-40"
          :y="0"
        >
          <AppTiltCard
            :max="6"
            class="group mx-auto max-w-sm rounded-2xl md:max-w-none"
          >
            <div class="relative overflow-hidden rounded-2xl p-[2px]">
              <div
                class="absolute -inset-full animate-spin-slow opacity-70 transition-opacity group-hover:opacity-100 motion-reduce:animate-none [background:conic-gradient(from_0deg,var(--ui-primary),transparent_30%,var(--ui-secondary),transparent_70%,var(--ui-primary))]"
                aria-hidden="true"
              />
              <NuxtImg
                src="/images/profile.png"
                :alt="`Portrait of ${profile.firstName} ${profile.lastName}`"
                width="460"
                height="542"
                sizes="384px md:33vw"
                format="webp"
                loading="lazy"
                class="relative h-full w-full rounded-[calc(1rem-2px)] bg-gradient-to-b from-(--ui-bg-elevated) to-(--ui-bg) object-cover"
              />
            </div>
          </AppTiltCard>
        </AppReveal>

        <div class="space-y-6 text-lg md:col-span-2 md:text-xl">
          <AppReveal
            v-for="(paragraph, index) in profile.about"
            :key="index"
            :delay="0.1 * (index + 1)"
          >
            <p class="leading-relaxed text-muted">
              {{ paragraph }}
            </p>
          </AppReveal>

          <AppReveal :delay="0.3">
            <ul class="flex flex-wrap gap-3 pt-2">
              <li
                v-for="chip in profile.chips"
                :key="chip.label"
                class="flex items-center gap-2 rounded-full border border-default bg-muted/50 px-4 py-1.5 text-sm text-muted"
              >
                <UIcon
                  :name="chip.icon"
                  class="size-[15px] text-primary"
                />
                {{ chip.label }}
              </li>
            </ul>
          </AppReveal>

          <dl class="grid grid-cols-3 gap-4 pt-4">
            <AppReveal
              v-for="(stat, index) in profile.stats"
              :key="stat.label"
              :delay="0.35 + index * 0.1"
              :y="20"
            >
              <div class="glass-card flex h-full flex-col-reverse justify-center rounded-2xl! p-4 text-center transition-colors hover:border-primary/30 md:p-5">
                <dt class="mt-1 block text-xs text-muted md:text-sm">
                  {{ stat.label }}
                </dt>
                <dd class="text-gradient block text-3xl font-bold md:text-4xl">
                  <AppCountUp
                    :to="stat.value"
                    :suffix="stat.suffix"
                    :delay="index * 0.1"
                  />
                </dd>
              </div>
            </AppReveal>
          </dl>
        </div>
      </div>

      <HomeServices />
    </div>
  </section>
</template>
