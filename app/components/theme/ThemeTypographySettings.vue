<script setup lang="ts">
import { THEME_FONTS, THEME_FONT_WEIGHTS, type ThemeFontWeight, type ThemeTypography } from '~~/shared/types/theme'

const { theme, setTypography } = useTheme()

const fontItems = THEME_FONTS.map(font => ({ label: font, value: font }))
const weightItems = THEME_FONT_WEIGHTS.map(weight => ({
  label: `${weight} · ${{ 400: 'Regular', 500: 'Medium', 600: 'Semibold', 700: 'Bold' }[weight]}`,
  value: weight,
}))

const weightFields: { key: keyof ThemeTypography, label: string, hint: string }[] = [
  { key: 'fontWeightNormal', label: 'Body text', hint: 'Paragraphs and descriptions' },
  { key: 'fontWeightMedium', label: 'Medium', hint: 'Buttons, chips and labels' },
  { key: 'fontWeightSemibold', label: 'Semibold', hint: 'Card and job titles' },
  { key: 'fontWeightBold', label: 'Bold', hint: 'Hero name and section headings' },
]
</script>

<template>
  <div class="space-y-5">
    <div class="grid gap-4 sm:grid-cols-2">
      <UFormField label="Body font">
        <USelect
          :model-value="theme.typography.fontFamily"
          :items="fontItems"
          class="w-full"
          @update:model-value="value => setTypography('fontFamily', value)"
        />
      </UFormField>
      <UFormField label="Heading font">
        <USelect
          :model-value="theme.typography.headingFontFamily"
          :items="fontItems"
          class="w-full"
          @update:model-value="value => setTypography('headingFontFamily', value)"
        />
      </UFormField>
    </div>

    <div
      class="rounded-xl border border-default bg-muted/50 p-4"
      aria-hidden="true"
    >
      <p
        class="text-xl text-highlighted"
        :style="{ fontFamily: `'${theme.typography.headingFontFamily}'`, fontWeight: theme.typography.fontWeightBold }"
      >
        Heading preview
      </p>
      <p
        class="mt-1 text-sm text-muted"
        :style="{ fontFamily: `'${theme.typography.fontFamily}'`, fontWeight: theme.typography.fontWeightNormal }"
      >
        The quick brown fox jumps over the lazy dog.
      </p>
    </div>

    <div class="space-y-3">
      <h4 class="font-mono text-xs tracking-wider text-muted uppercase">
        Font weights
      </h4>
      <UFormField
        v-for="field in weightFields"
        :key="field.key"
        :label="field.label"
        :hint="field.hint"
      >
        <USelect
          :model-value="theme.typography[field.key] as ThemeFontWeight"
          :items="weightItems"
          class="w-full"
          @update:model-value="value => setTypography(field.key, value)"
        />
      </UFormField>
    </div>
  </div>
</template>
