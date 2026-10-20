<script setup lang="ts">
import type { Project } from '~~/shared/types/portfolio'

const props = defineProps<{ project: Project }>()
const emit = defineEmits<{ open: [] }>()

const imageFailed = ref(false)
const hostname = computed(() => (props.project.liveUrl ? new URL(props.project.liveUrl).hostname.replace(/^www\./, '') : ''))
const visibleTags = computed(() => props.project.tags.slice(0, 4))
const hiddenCount = computed(() => props.project.tags.length - visibleTags.value.length)
</script>

<template>
  <AppTiltCard
    as="article"
    class="glass-card group h-full cursor-pointer p-6 outline-primary transition-colors duration-300 hover:border-primary/30 focus-visible:outline-2"
    role="button"
    tabindex="0"
    :aria-label="`Open details for ${props.project.title}`"
    @click="emit('open')"
    @keydown.enter.prevent="emit('open')"
    @keydown.space.prevent="emit('open')"
  >
    <div
      v-if="props.project.image && !imageFailed"
      class="relative mb-5 aspect-[16/10] overflow-hidden rounded-xl border border-default bg-muted"
    >
      <NuxtImg
        :src="props.project.image"
        :alt="`${props.project.title} preview`"
        width="640"
        height="400"
        sizes="100vw md:50vw lg:400px"
        format="webp"
        loading="lazy"
        class="h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105"
        @error="imageFailed = true"
      />
      <span
        v-if="hostname"
        class="absolute top-2 left-2 rounded-full bg-default/75 px-2.5 py-0.5 font-mono text-[10px] text-default/90 backdrop-blur-sm"
      >
        {{ hostname }}
      </span>
      <span
        class="absolute top-2 right-2 flex size-7 items-center justify-center rounded-full bg-default/75 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:text-primary group-hover:opacity-100"
        aria-hidden="true"
      >
        <UIcon
          name="i-lucide-arrow-up-right"
          class="size-4"
        />
      </span>
    </div>

    <div
      v-else
      class="mb-5 flex items-start justify-between"
    >
      <span
        class="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-3xl transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110"
        aria-hidden="true"
      >
        {{ props.project.emoji }}
      </span>
      <UIcon
        name="i-lucide-arrow-up-right"
        class="size-5 -translate-x-2 translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-0 group-hover:text-primary group-hover:opacity-100"
      />
    </div>

    <h3 class="text-lg font-semibold text-highlighted transition-colors group-hover:text-primary">
      {{ props.project.title }}
    </h3>
    <p
      v-if="props.project.subtitle"
      class="mt-0.5 font-mono text-xs text-muted/80"
    >
      {{ props.project.subtitle }}
    </p>
    <p class="mt-2 mb-4 line-clamp-3 text-sm text-muted">
      {{ props.project.description }}
    </p>

    <ul class="flex flex-wrap gap-2">
      <li
        v-for="tag in visibleTags"
        :key="tag"
        class="rounded bg-muted px-2 py-1 font-mono text-xs text-primary"
      >
        {{ tag }}
      </li>
      <li
        v-if="hiddenCount > 0"
        class="rounded bg-muted px-2 py-1 font-mono text-xs text-muted"
      >
        +{{ hiddenCount }}
      </li>
    </ul>
  </AppTiltCard>
</template>
