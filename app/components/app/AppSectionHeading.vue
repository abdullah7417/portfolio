<script setup lang="ts">
const props = withDefaults(defineProps<{
  eyebrow: string
  title: string
  description?: string
  align?: 'start' | 'center'
}>(), {
  description: undefined,
  align: 'start',
})
</script>

<template>
  <div
    class="mb-12"
    :class="{ 'text-center': props.align === 'center' }"
  >
    <AppReveal
      :y="12"
      :blur="false"
    >
      <p class="mb-2 inline-flex items-center gap-3 font-mono text-sm text-primary">
        <span
          class="h-px w-8 bg-primary/60"
          aria-hidden="true"
        />
        {{ props.eyebrow }}
      </p>
    </AppReveal>
    <AppSplitWords
      as="h2"
      :text="props.title"
      class="block text-3xl font-bold tracking-tight text-highlighted md:text-5xl"
    />
    <AppReveal
      v-if="props.description"
      :delay="0.2"
    >
      <p
        class="mt-4 text-muted"
        :class="props.align === 'center' ? 'mx-auto max-w-md' : 'max-w-xl'"
      >
        {{ props.description }}
      </p>
    </AppReveal>
  </div>
</template>
