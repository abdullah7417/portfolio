<script setup lang="ts">
const { open } = useThemeBuilder()
const { activePreset, isDefault, reset } = useTheme()

// Non-modal so the page stays scrollable for live preview; Escape is handled here
onKeyStroke('Escape', (event) => {
  if (open.value && !event.defaultPrevented) open.value = false
})

const sections = [
  { id: 'presets', title: 'Presets', icon: 'i-lucide-sparkles' },
  { id: 'colors', title: 'Colors', icon: 'i-lucide-palette' },
  { id: 'typography', title: 'Typography', icon: 'i-lucide-type' },
  { id: 'borders', title: 'Borders & radius', icon: 'i-lucide-square-dashed' },
] as const
</script>

<template>
  <USlideover
    v-model:open="open"
    side="right"
    title="Customize theme"
    description="Changes apply instantly and are saved in this browser."
    :modal="false"
    :overlay="false"
    :dismissible="false"
    :ui="{
      content: 'max-w-full sm:max-w-sm glass-card rounded-none sm:rounded-none border-y-0 border-e-0',
      header: 'border-b border-default',
      body: 'space-y-8 sm:p-6',
      footer: 'border-t border-default justify-between gap-3',
    }"
  >
    <template #body>
      <section
        v-for="section in sections"
        :key="section.id"
        :aria-labelledby="`theme-${section.id}`"
      >
        <h3
          :id="`theme-${section.id}`"
          class="mb-4 flex items-center gap-2 font-mono text-sm text-primary"
        >
          <UIcon
            :name="section.icon"
            class="size-4"
          />
          {{ section.title }}
        </h3>
        <ThemePresetPicker v-if="section.id === 'presets'" />
        <ThemeColorSettings v-else-if="section.id === 'colors'" />
        <ThemeTypographySettings v-else-if="section.id === 'typography'" />
        <ThemeBorderSettings v-else />
      </section>
    </template>

    <template #footer>
      <p
        class="flex min-w-0 items-center gap-2 text-xs text-muted"
        aria-live="polite"
      >
        <span
          class="size-2 shrink-0 rounded-full"
          :class="activePreset ? 'bg-primary' : 'bg-warning'"
          aria-hidden="true"
        />
        <span class="truncate">{{ activePreset ? `${activePreset.name} preset` : 'Custom theme' }}</span>
      </p>
      <UButton
        icon="i-lucide-rotate-ccw"
        label="Reset to default"
        color="neutral"
        variant="outline"
        size="sm"
        class="rounded-pill"
        :disabled="isDefault"
        @click="reset"
      />
    </template>
  </USlideover>
</template>
