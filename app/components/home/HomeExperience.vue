<script setup lang="ts">
import { education, experiences } from '~/data/portfolio'

const timeline = useTemplateRef<HTMLElement>('timeline')
const { scrollYProgress } = useScroll({ target: timeline, offset: ['start 75%', 'end 55%'] })
const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 28, restDelta: 0.001 })

const expanded = ref<Set<number>>(new Set())

function toggle(index: number) {
  const next = new Set(expanded.value)
  if (next.has(index)) next.delete(index)
  else next.add(index)
  expanded.value = next
}
</script>

<template>
  <section
    id="experience"
    class="section-padding"
  >
    <div class="mx-auto max-w-4xl">
      <AppSectionHeading
        eyebrow="04. Experience"
        title="Where I've worked"
      />

      <ol
        ref="timeline"
        class="relative"
      >
        <span
          class="absolute top-0 bottom-0 left-4 w-0.5 -translate-x-1/2 bg-(--ui-border) md:left-1/2"
          aria-hidden="true"
        />
        <Motion
          as="span"
          aria-hidden="true"
          class="absolute top-0 bottom-0 left-4 w-0.5 -translate-x-1/2 shadow-[0_0_12px_color-mix(in_oklab,var(--ui-primary)_60%,transparent)] [background:linear-gradient(to_bottom,var(--ui-primary),var(--ui-secondary))] md:left-1/2"
          :style="{ scaleY, originY: 0 }"
        />

        <li
          v-for="(job, index) in experiences"
          :key="`${job.company}-${job.start}`"
          class="relative mb-12 flex items-start"
          :class="{ 'md:flex-row-reverse': index % 2 === 0 }"
        >
          <div class="absolute left-4 z-10 size-8 -translate-x-1/2 md:left-1/2">
            <Motion
              as="div"
              class="relative flex size-full items-center justify-center rounded-full border-2 border-primary bg-muted"
              :initial="{ scale: 0 }"
              :while-in-view="{ scale: 1 }"
              :in-view-options="{ once: true, margin: '-80px' }"
              :transition="{ type: 'spring', stiffness: 300, damping: 18 }"
            >
              <span
                v-if="job.current"
                class="absolute inset-0 animate-ping rounded-full bg-primary/40 motion-reduce:hidden"
                aria-hidden="true"
              />
              <UIcon
                name="i-lucide-briefcase"
                class="relative size-3.5 text-primary"
              />
            </Motion>
          </div>

          <div
            class="ms-16 w-full md:ms-0 md:w-[calc(50%-2rem)]"
            :class="index % 2 === 0 ? 'md:me-auto md:pe-8' : 'md:ms-auto md:ps-8'"
          >
            <AppReveal
              :x="index % 2 === 0 ? -40 : 40"
              :y="0"
            >
              <AppTiltCard
                :max="4"
                class="glass-card p-6 transition-colors hover:border-primary/30"
              >
                <div class="flex items-start justify-between gap-4">
                  <div>
                    <p class="flex flex-wrap items-center gap-2 font-mono text-xs text-primary">
                      {{ job.start }} — {{ job.end ?? 'Present' }}
                      <span
                        v-if="job.current"
                        class="rounded-pill bg-primary/15 px-2 py-0.5 text-[10px] tracking-wider uppercase"
                      >
                        Current
                      </span>
                    </p>
                    <h3 class="mt-1 text-lg font-semibold text-highlighted">
                      {{ job.title }}
                    </h3>
                    <p class="text-sm text-primary/80">
                      {{ job.company }}<span
                        v-if="job.sector"
                        class="text-muted"
                      > · {{ job.sector }}</span>
                    </p>
                    <p
                      v-if="job.location"
                      class="mt-0.5 flex items-center gap-1 text-xs text-muted/80"
                    >
                      <UIcon
                        name="i-lucide-map-pin"
                        class="size-3"
                      />
                      {{ job.location }}
                    </p>
                  </div>
                  <NuxtImg
                    v-if="job.logo"
                    :src="job.logo"
                    :alt="`${job.company} logo`"
                    width="48"
                    height="48"
                    class="size-12 shrink-0 rounded-xl bg-white object-contain p-1.5"
                  />
                </div>

                <p class="mt-3 text-sm text-muted">
                  {{ job.description }}
                </p>

                <template v-if="job.highlights?.length">
                  <AnimatePresence :initial="false">
                    <Motion
                      v-if="expanded.has(index)"
                      :id="`job-${index}-highlights`"
                      as="ul"
                      class="overflow-hidden"
                      :initial="{ height: 0, opacity: 0 }"
                      :animate="{ height: 'auto', opacity: 1 }"
                      :exit="{ height: 0, opacity: 0 }"
                      :transition="{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }"
                    >
                      <li
                        v-for="item in job.highlights"
                        :key="item"
                        class="mt-3 flex gap-3 text-sm text-muted"
                      >
                        <span
                          class="mt-2 size-1.5 shrink-0 rounded-full bg-primary/70"
                          aria-hidden="true"
                        />
                        {{ item }}
                      </li>
                    </Motion>
                  </AnimatePresence>
                  <button
                    type="button"
                    class="mt-4 inline-flex items-center gap-1 font-mono text-xs text-primary hover:text-primary/80"
                    :aria-expanded="expanded.has(index)"
                    :aria-controls="`job-${index}-highlights`"
                    @click="toggle(index)"
                  >
                    {{ expanded.has(index) ? 'Show less' : `Show ${job.highlights.length} more` }}
                    <UIcon
                      name="i-lucide-chevron-down"
                      class="size-3.5 transition-transform duration-300"
                      :class="{ 'rotate-180': expanded.has(index) }"
                    />
                  </button>
                </template>
              </AppTiltCard>
            </AppReveal>
          </div>
        </li>
      </ol>

      <div
        v-if="education.length"
        class="mt-8"
      >
        <AppReveal
          :y="12"
          :blur="false"
        >
          <h3 class="mb-6 flex items-center gap-3 font-mono text-sm text-primary">
            <span
              class="h-px w-8 bg-primary/60"
              aria-hidden="true"
            />
            Education
          </h3>
        </AppReveal>

        <ul class="grid gap-6 md:grid-cols-2">
          <AppReveal
            v-for="(item, index) in education"
            :key="`${item.school}-${item.degree}`"
            as="li"
            :delay="index * 0.12"
          >
            <AppTiltCard
              :max="4"
              class="glass-card h-full p-6 transition-colors hover:border-primary/30"
            >
              <div class="flex items-start gap-4">
                <div class="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <UIcon
                    name="i-lucide-graduation-cap"
                    class="size-5 text-primary"
                  />
                </div>
                <div>
                  <p class="font-mono text-xs text-primary">
                    {{ item.start }} — {{ item.end }}
                  </p>
                  <h4 class="mt-1 text-lg font-semibold text-highlighted">
                    {{ item.school }}
                  </h4>
                  <p class="text-sm text-muted">
                    {{ item.degree }}
                  </p>
                  <p
                    v-if="item.location"
                    class="mt-1 text-xs text-muted/80"
                  >
                    {{ item.location }}
                  </p>
                </div>
              </div>
            </AppTiltCard>
          </AppReveal>
        </ul>
      </div>
    </div>
  </section>
</template>
