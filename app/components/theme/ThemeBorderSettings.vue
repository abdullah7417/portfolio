<script setup lang="ts">
import { THEME_BORDER_STYLES, THEME_BORDER_WIDTHS, type ThemeBorders } from '~~/shared/types/theme'

const { theme, setBorder } = useTheme()

const PILL = 9999

const widthOptions = THEME_BORDER_WIDTHS.map(width => ({ label: width === '0px' ? 'None' : width, value: width }))
const styleOptions = THEME_BORDER_STYLES.map(style => ({ label: style[0]!.toUpperCase() + style.slice(1), value: style }))

const radiusFields: { key: keyof ThemeBorders, label: string, max: number }[] = [
  { key: 'radiusSm', label: 'Small · tags, keys & menu items', max: 16 },
  { key: 'radiusMd', label: 'Medium · inputs, menus & URL bars', max: 24 },
  { key: 'radiusLg', label: 'Large · icon boxes & images', max: 40 },
  { key: 'radiusXl', label: 'Extra large · stats, dialogs & rows', max: 48 },
  { key: 'radiusCard', label: 'Cards', max: 48 },
]

const isPill = computed({
  get: () => theme.value.borders.radiusFull >= PILL,
  set: value => setBorder('radiusFull', value ? PILL : 12),
})
</script>

<template>
  <div class="space-y-5">
    <ThemeSegmentedControl
      :model-value="theme.borders.width"
      label="Border width"
      :options="widthOptions"
      @update:model-value="value => setBorder('width', value)"
    />
    <ThemeSegmentedControl
      :model-value="theme.borders.style"
      label="Border style"
      :options="styleOptions"
      @update:model-value="value => setBorder('style', value)"
    />

    <div class="space-y-4">
      <h4 class="font-mono text-xs tracking-wider text-muted uppercase">
        Corner radius
      </h4>
      <ThemeRangeControl
        v-for="field in radiusFields"
        :key="field.key"
        :model-value="theme.borders[field.key] as number"
        :label="field.label"
        :max="field.max"
        @update:model-value="value => setBorder(field.key, value)"
      />

      <div class="space-y-3 rounded-xl border border-default bg-muted/50 p-4">
        <USwitch
          v-model="isPill"
          label="Fully rounded buttons & chips"
        />
        <ThemeRangeControl
          :model-value="isPill ? 32 : theme.borders.radiusFull"
          label="Buttons & chips"
          :max="32"
          :disabled="isPill"
          @update:model-value="value => setBorder('radiusFull', value)"
        />
      </div>
    </div>
  </div>
</template>
