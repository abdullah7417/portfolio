<script setup lang="ts">
const { mode, activePreset, applyPreset } = useTheme()
</script>

<template>
  <ul class="grid grid-cols-2 gap-3">
    <li
      v-for="preset in THEME_PRESETS"
      :key="preset.id"
    >
      <button
        type="button"
        class="group flex h-full w-full flex-col gap-3 rounded-xl border p-3 text-start transition-colors focus-visible:outline-2 focus-visible:outline-primary"
        :class="activePreset?.id === preset.id ? 'border-primary bg-primary/10' : 'border-default bg-muted/40 hover:border-primary/40'"
        :aria-pressed="activePreset?.id === preset.id"
        @click="applyPreset(preset)"
      >
        <span
          class="flex h-8 w-full overflow-hidden rounded-md border border-default"
          aria-hidden="true"
        >
          <span
            class="flex-1"
            :style="{ background: preset.theme.colors[preset.colorMode ?? mode].background }"
          />
          <span
            class="flex-1"
            :style="{ background: preset.theme.colors[preset.colorMode ?? mode].surface }"
          />
          <span
            class="flex-[2]"
            :style="{ background: `linear-gradient(135deg, ${preset.theme.colors[preset.colorMode ?? mode].primary}, ${preset.theme.colors[preset.colorMode ?? mode].secondary})` }"
          />
        </span>
        <span>
          <span class="flex items-center gap-1.5 text-sm font-medium text-highlighted">
            {{ preset.name }}
            <UIcon
              v-if="activePreset?.id === preset.id"
              name="i-lucide-check"
              class="size-3.5 text-primary"
            />
          </span>
          <span class="mt-0.5 block text-xs leading-snug text-muted">{{ preset.description }}</span>
        </span>
      </button>
    </li>
  </ul>
</template>
