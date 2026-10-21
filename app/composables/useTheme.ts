import type { PortfolioTheme, ThemeBorders, ThemeColors, ThemeMode, ThemePreset, ThemeTypography } from '~~/shared/types/theme'
import { themeSchema } from '~~/shared/schemas/theme.schema'

/**
 * Single source of truth for the portfolio theme.
 * plugins/theme.ts turns this state into CSS variables; nothing else touches the DOM.
 */
export function useTheme() {
  const theme = useState<PortfolioTheme>('theme', () => cloneTheme(DEFAULT_THEME))
  const colorMode = useColorMode()

  const mode = computed<ThemeMode>(() => (colorMode.value === 'light' ? 'light' : 'dark'))
  const activeColors = computed(() => theme.value.colors[mode.value])

  const activePreset = computed(() => THEME_PRESETS.find(preset => isSameTheme(preset.theme, theme.value)))
  const isDefault = computed(() => isSameTheme(theme.value, DEFAULT_THEME))

  function setColor(targetMode: ThemeMode, key: keyof ThemeColors, value: string) {
    theme.value.colors[targetMode][key] = value
  }

  function setTypography<K extends keyof ThemeTypography>(key: K, value: ThemeTypography[K]) {
    theme.value.typography[key] = value
  }

  function setBorder<K extends keyof ThemeBorders>(key: K, value: ThemeBorders[K]) {
    theme.value.borders[key] = value
  }

  function applyPreset(preset: ThemePreset) {
    theme.value = cloneTheme(preset.theme)
    if (preset.colorMode) colorMode.preference = preset.colorMode
  }

  /** Replaces the theme if `value` passes validation. Returns whether it was applied. */
  function applyTheme(value: unknown) {
    const result = themeSchema.safeParse(value)
    if (result.success) theme.value = result.data
    return result.success
  }

  function reset() {
    theme.value = cloneTheme(DEFAULT_THEME)
  }

  return {
    theme: readonly(theme),
    mode,
    activeColors,
    activePreset,
    isDefault,
    setColor,
    setTypography,
    setBorder,
    applyPreset,
    applyTheme,
    reset,
  }
}
