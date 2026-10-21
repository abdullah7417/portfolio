<script setup lang="ts">
import { hexColorSchema } from '~~/shared/schemas/theme.schema'

/** Color swatch picker plus an editable hex field, kept in sync. */
const model = defineModel<string>({ required: true })
const props = defineProps<{
  label: string
  hint?: string
}>()

const id = useId()
const draft = ref(model.value)
watch(model, value => (draft.value = value))

function normalize(value: string) {
  const trimmed = value.trim().toLowerCase()
  return trimmed.startsWith('#') ? trimmed : `#${trimmed}`
}

const invalid = computed(() => !hexColorSchema.safeParse(normalize(draft.value)).success)

function onHexInput(value: string | number) {
  draft.value = String(value)
  const hex = normalize(draft.value)
  if (hexColorSchema.safeParse(hex).success) model.value = hex
}

function onPickerInput(event: Event) {
  model.value = (event.target as HTMLInputElement).value
}
</script>

<template>
  <div class="flex items-center gap-3">
    <label
      :for="`${id}-picker`"
      class="relative size-9 shrink-0 cursor-pointer overflow-hidden rounded-pill border border-default shadow-sm transition-transform focus-within:outline-2 focus-within:outline-primary hover:scale-105"
      :style="{ backgroundColor: model }"
    >
      <span class="sr-only">{{ props.label }} color picker</span>
      <input
        :id="`${id}-picker`"
        type="color"
        class="absolute inset-0 size-full cursor-pointer opacity-0"
        :value="model"
        @input="onPickerInput"
      >
    </label>

    <div class="min-w-0 flex-1">
      <label
        :for="`${id}-hex`"
        class="block text-sm font-medium text-highlighted"
      >
        {{ props.label }}
      </label>
      <p
        v-if="props.hint"
        class="truncate text-xs text-muted"
      >
        {{ props.hint }}
      </p>
    </div>

    <UInput
      :id="`${id}-hex`"
      :model-value="draft"
      size="sm"
      maxlength="7"
      spellcheck="false"
      autocomplete="off"
      class="w-24"
      :color="invalid ? 'error' : 'neutral'"
      :highlight="invalid"
      :aria-invalid="invalid"
      :ui="{ base: 'font-mono uppercase' }"
      @update:model-value="onHexInput"
      @blur="draft = model"
    />
  </div>
</template>
