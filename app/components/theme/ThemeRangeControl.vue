<script setup lang="ts">
const model = defineModel<number>({ required: true })
const props = withDefaults(defineProps<{
  label: string
  min?: number
  max: number
  step?: number
  unit?: string
  disabled?: boolean
}>(), {
  min: 0,
  step: 1,
  unit: 'px',
  disabled: false,
})
</script>

<template>
  <div>
    <div class="mb-2 flex items-center justify-between text-sm">
      <span class="font-medium text-highlighted">{{ props.label }}</span>
      <span class="font-mono text-xs text-muted">{{ model }}{{ props.unit }}</span>
    </div>
    <USlider
      v-model="model"
      :min="props.min"
      :max="props.max"
      :step="props.step"
      :disabled="props.disabled"
      size="sm"
      :aria-label="props.label"
    />
  </div>
</template>
