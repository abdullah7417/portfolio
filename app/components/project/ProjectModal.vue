<script setup lang="ts">
import type { Project } from '~~/shared/types/portfolio'

const open = defineModel<boolean>('open', { default: false })
const props = defineProps<{ project: Project | null }>()
</script>

<template>
  <UModal
    v-model:open="open"
    :title="props.project?.title ?? 'Project'"
    :description="props.project?.subtitle ?? 'Project details'"
    :ui="{
      overlay: 'bg-default/80 backdrop-blur-md',
      content: 'glass-card max-w-2xl rounded-2xl sm:rounded-2xl max-h-[88vh] overflow-y-auto divide-y-0',
    }"
  >
    <template #content="{ close }">
      <div
        v-if="props.project"
        class="relative p-6 md:p-8"
      >
        <UButton
          icon="i-lucide-x"
          color="neutral"
          variant="ghost"
          class="absolute top-4 right-4 rounded-full"
          aria-label="Close"
          @click="close"
        />

        <div class="flex items-center gap-4 pe-10">
          <span
            class="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-3xl"
            aria-hidden="true"
          >
            {{ props.project.emoji }}
          </span>
          <div>
            <h3 class="text-2xl font-bold text-highlighted">
              {{ props.project.title }}
            </h3>
            <p
              v-if="props.project.subtitle"
              class="font-mono text-sm text-muted/80"
            >
              {{ props.project.subtitle }}
            </p>
          </div>
        </div>

        <a
          v-if="props.project.image"
          :href="props.project.liveUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="group/frame mt-5 block overflow-hidden rounded-xl border border-default bg-muted shadow-lg"
        >
          <div class="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-default bg-default/60 px-3 py-2">
            <div
              class="flex gap-1.5"
              aria-hidden="true"
            >
              <span class="size-2.5 rounded-full bg-red-400/70" />
              <span class="size-2.5 rounded-full bg-yellow-400/70" />
              <span class="size-2.5 rounded-full bg-green-400/70" />
            </div>
            <span class="truncate rounded-md bg-muted px-3 py-0.5 text-center font-mono text-[11px] text-muted">
              {{ props.project.liveUrl?.replace(/^https?:\/\//, '') }}
            </span>
            <span
              class="w-[42px]"
              aria-hidden="true"
            />
          </div>
          <NuxtImg
            :src="props.project.image"
            :alt="`${props.project.title} screenshot`"
            width="1024"
            height="640"
            sizes="100vw md:672px"
            format="webp"
            class="aspect-[16/10] w-full object-cover object-top transition-transform duration-700 group-hover/frame:scale-[1.03]"
          />
        </a>

        <p class="mt-5 text-muted">
          {{ props.project.description }}
        </p>

        <ul
          v-if="props.project.highlights?.length"
          class="mt-4 space-y-3"
        >
          <li
            v-for="item in props.project.highlights"
            :key="item"
            class="flex gap-3 text-sm text-muted"
          >
            <span
              class="mt-2 size-1.5 shrink-0 rounded-full bg-primary/70"
              aria-hidden="true"
            />
            {{ item }}
          </li>
        </ul>

        <ul class="mt-6 flex flex-wrap gap-2">
          <li
            v-for="tag in props.project.tags"
            :key="tag"
            class="rounded bg-muted px-2 py-1 font-mono text-xs text-primary"
          >
            {{ tag }}
          </li>
        </ul>

        <div class="mt-6 flex flex-wrap gap-3">
          <a
            v-if="props.project.codeUrl"
            :href="props.project.codeUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-sm text-highlighted transition-colors hover:bg-accented"
          >
            <UIcon
              name="i-simple-icons-github"
              class="size-4"
            />
            Code
          </a>
          <a
            v-if="props.project.liveUrl"
            :href="props.project.liveUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="bg-gradient-primary inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-inverted transition-shadow hover:shadow-glow"
          >
            <UIcon
              name="i-lucide-external-link"
              class="size-4"
            />
            Live Demo
          </a>
        </div>
      </div>
    </template>
  </UModal>
</template>
