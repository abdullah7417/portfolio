<script setup lang="ts" generic="T extends string | number">
/** Small radio group rendered as a segmented pill. */
const model = defineModel<T>({ required: true })
const props = defineProps<{
  label: string
  options: { label: string, value: T, icon?: string }[]
}>()

function onKeydown(event: KeyboardEvent, index: number) {
  const step = event.key === 'ArrowRight' || event.key === 'ArrowDown' ? 1 : event.key === 'ArrowLeft' || event.key === 'ArrowUp' ? -1 : 0
  if (!step) return
  event.preventDefault()
  const next = (index + step + props.options.length) % props.options.length
  model.value = props.options[next]!.value
  const group = (event.currentTarget as HTMLElement).parentElement
  ;(group?.children[next] as HTMLElement | undefined)?.focus()
}
</script>

<template>
  <div>
    <p class="mb-2 text-sm font-medium text-highlighted">
      {{ props.label }}
    </p>
    <div
      role="radiogroup"
      :aria-label="props.label"
      class="flex gap-1 rounded-pill border border-default bg-muted p-1"
    >
      <button
        v-for="(option, index) in props.options"
        :key="String(option.value)"
        type="button"
        role="radio"
        :aria-checked="model === option.value"
        :tabindex="model === option.value ? 0 : -1"
        class="flex flex-1 items-center justify-center gap-1.5 rounded-pill px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-primary"
        :class="model === option.value ? 'bg-gradient-primary text-on-primary shadow-sm' : 'text-muted hover:text-highlighted'"
        @click="model = option.value"
        @keydown="onKeydown($event, index)"
      >
        <UIcon
          v-if="option.icon"
          :name="option.icon"
          class="size-3.5"
        />
        {{ option.label }}
      </button>
    </div>
  </div>
</template>
