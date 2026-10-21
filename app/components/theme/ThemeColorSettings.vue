<script setup lang="ts">
import type { ThemeColors, ThemeMode } from '~~/shared/types/theme'

const { theme, mode, setColor } = useTheme()
const colorMode = useColorMode()

// Editing a palette also previews it: the tabs switch the site's color mode
const editedMode = computed<ThemeMode>({
  get: () => mode.value,
  set: value => (colorMode.preference = value),
})

const modeOptions = [
  { label: 'Dark', value: 'dark' as const, icon: 'i-lucide-moon' },
  { label: 'Light', value: 'light' as const, icon: 'i-lucide-sun' },
]

const groups: { title: string, fields: { key: keyof ThemeColors, label: string, hint: string }[] }[] = [
  {
    title: 'Brand',
    fields: [
      { key: 'primary', label: 'Primary', hint: 'Links, highlights, gradient start' },
      { key: 'secondary', label: 'Secondary', hint: 'Gradient end, glows, timeline' },
      { key: 'accent', label: 'Accent', hint: 'Gradient text: name, logo, stats' },
      { key: 'primaryHover', label: 'Button hover', hint: 'Primary buttons on hover' },
      { key: 'onPrimary', label: 'Text on primary', hint: 'Labels on gradient buttons' },
    ],
  },
  {
    title: 'Surfaces & text',
    fields: [
      { key: 'background', label: 'Background', hint: 'Page background' },
      { key: 'surface', label: 'Surface', hint: 'Cards, panels, inputs' },
      { key: 'text', label: 'Text', hint: 'Main text' },
      { key: 'textMuted', label: 'Muted text', hint: 'Descriptions and labels' },
      { key: 'border', label: 'Border', hint: 'Outlines and dividers' },
    ],
  },
]
</script>

<template>
  <div class="space-y-6">
    <ThemeSegmentedControl
      v-model="editedMode"
      label="Editing palette for"
      :options="modeOptions"
    />

    <div
      v-for="group in groups"
      :key="group.title"
      class="space-y-4"
    >
      <h4 class="font-mono text-xs tracking-wider text-muted uppercase">
        {{ group.title }}
      </h4>
      <ThemeColorControl
        v-for="field in group.fields"
        :key="field.key"
        :model-value="theme.colors[editedMode][field.key]"
        :label="field.label"
        :hint="field.hint"
        @update:model-value="value => setColor(editedMode, field.key, value)"
      />
    </div>
  </div>
</template>
