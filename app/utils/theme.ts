import type { PortfolioTheme, ThemeBorders, ThemeColors, ThemeFont, ThemePreset, ThemeTypography } from '~~/shared/types/theme'

export const THEME_STORAGE_KEY = 'portfolio-theme'
/** Generated CSS cached for the pre-paint script in plugins/theme.ts */
export const THEME_CSS_STORAGE_KEY = 'portfolio-theme-css'
export const THEME_STYLE_ID = 'portfolio-theme'

const DEFAULT_TYPOGRAPHY: ThemeTypography = {
  fontFamily: 'Inter',
  headingFontFamily: 'Inter',
  fontWeightNormal: 400,
  fontWeightMedium: 500,
  fontWeightSemibold: 600,
  fontWeightBold: 700,
}

const DEFAULT_BORDERS: ThemeBorders = {
  width: '1px',
  style: 'solid',
  radiusSm: 4,
  radiusMd: 12,
  radiusLg: 24,
  radiusXl: 32,
  radiusCard: 32,
  radiusFull: 9999,
}

/** The original portfolio design: teal on navy. */
export const DEFAULT_THEME: PortfolioTheme = {
  colors: {
    dark: {
      primary: '#2bd4bd',
      secondary: '#30abe8',
      accent: '#48b4eb',
      background: '#080c16',
      surface: '#0f1524',
      text: '#e0e6eb',
      textMuted: '#7b899e',
      border: '#252a37',
      primaryHover: '#2bd4bd',
      onPrimary: '#080c16',
    },
    light: {
      primary: '#22a997',
      secondary: '#189bdc',
      accent: '#1791cf',
      background: '#f8fafc',
      surface: '#ffffff',
      text: '#0f1729',
      textMuted: '#566376',
      border: '#dae0e7',
      primaryHover: '#22a997',
      onPrimary: '#ffffff',
    },
  },
  typography: DEFAULT_TYPOGRAPHY,
  borders: DEFAULT_BORDERS,
}

export const THEME_PRESETS: ThemePreset[] = [
  {
    id: 'default',
    name: 'Default',
    description: 'The original teal & navy look',
    theme: DEFAULT_THEME,
  },
  {
    id: 'monochrome',
    name: 'Monochrome',
    description: 'Black & white with silver gradients',
    theme: {
      colors: {
        dark: {
          primary: '#f5f5f5',
          secondary: '#a3a3a3',
          accent: '#9ca3af',
          background: '#0a0a0a',
          surface: '#121212',
          text: '#e5e5e5',
          textMuted: '#8a8a8a',
          border: '#262626',
          primaryHover: '#ffffff',
          onPrimary: '#0a0a0a',
        },
        light: {
          primary: '#171717',
          secondary: '#525252',
          accent: '#737373',
          background: '#fafafa',
          surface: '#ffffff',
          text: '#171717',
          textMuted: '#636363',
          border: '#e5e5e5',
          primaryHover: '#000000',
          onPrimary: '#ffffff',
        },
      },
      typography: { ...DEFAULT_TYPOGRAPHY, headingFontFamily: 'Space Grotesk' },
      borders: DEFAULT_BORDERS,
    },
  },
  {
    id: 'dark-modern',
    name: 'Dark Modern',
    description: 'Violet & pink on deep black',
    colorMode: 'dark',
    theme: {
      colors: {
        dark: {
          primary: '#8b5cf6',
          secondary: '#ec4899',
          accent: '#f472b6',
          background: '#09090b',
          surface: '#121216',
          text: '#e4e4e7',
          textMuted: '#8b8b96',
          border: '#27272a',
          primaryHover: '#a78bfa',
          onPrimary: '#ffffff',
        },
        light: {
          primary: '#7c3aed',
          secondary: '#db2777',
          accent: '#c026d3',
          background: '#fafafa',
          surface: '#ffffff',
          text: '#18181b',
          textMuted: '#5f5f6b',
          border: '#e4e4e7',
          primaryHover: '#6d28d9',
          onPrimary: '#ffffff',
        },
      },
      typography: { ...DEFAULT_TYPOGRAPHY, headingFontFamily: 'Sora' },
      borders: { ...DEFAULT_BORDERS, radiusCard: 24 },
    },
  },
  {
    id: 'light-minimal',
    name: 'Light Minimal',
    description: 'Clean blue on white, tighter corners',
    colorMode: 'light',
    theme: {
      colors: {
        dark: {
          primary: '#60a5fa',
          secondary: '#38bdf8',
          accent: '#818cf8',
          background: '#0b1120',
          surface: '#111827',
          text: '#e2e8f0',
          textMuted: '#94a3b8',
          border: '#1f2937',
          primaryHover: '#93c5fd',
          onPrimary: '#0b1120',
        },
        light: {
          primary: '#2563eb',
          secondary: '#0ea5e9',
          accent: '#6366f1',
          background: '#ffffff',
          surface: '#f8fafc',
          text: '#0f172a',
          textMuted: '#64748b',
          border: '#e2e8f0',
          primaryHover: '#1d4ed8',
          onPrimary: '#ffffff',
        },
      },
      typography: { ...DEFAULT_TYPOGRAPHY, fontFamily: 'Manrope', headingFontFamily: 'Manrope' },
      borders: { ...DEFAULT_BORDERS, radiusMd: 8, radiusLg: 10, radiusXl: 14, radiusCard: 16, radiusFull: 10 },
    },
  },
  {
    id: 'emerald',
    name: 'Emerald',
    description: 'A greener take on the original branding',
    theme: {
      colors: {
        dark: {
          primary: '#34d399',
          secondary: '#2dd4bf',
          accent: '#a3e635',
          background: '#06100c',
          surface: '#0c1a14',
          text: '#e2ece7',
          textMuted: '#7f968b',
          border: '#1d2e27',
          primaryHover: '#6ee7b7',
          onPrimary: '#06100c',
        },
        light: {
          primary: '#059669',
          secondary: '#0d9488',
          accent: '#65a30d',
          background: '#f6fbf8',
          surface: '#ffffff',
          text: '#0c1f17',
          textMuted: '#4f6b5f',
          border: '#d5e6dd',
          primaryHover: '#047857',
          onPrimary: '#ffffff',
        },
      },
      typography: { ...DEFAULT_TYPOGRAPHY, headingFontFamily: 'Outfit' },
      borders: DEFAULT_BORDERS,
    },
  },
]

/** Theme color → CSS variable it drives. Derived tokens are computed from these in main.css. */
const COLOR_VARIABLES: Record<keyof ThemeColors, string> = {
  primary: '--ui-primary',
  secondary: '--ui-secondary',
  accent: '--theme-accent',
  background: '--ui-bg',
  surface: '--ui-bg-elevated',
  text: '--ui-text',
  textMuted: '--ui-text-muted',
  border: '--ui-border',
  primaryHover: '--theme-primary-hover',
  onPrimary: '--theme-on-primary',
}

function fontStack(font: ThemeFont) {
  return `"${font}", ui-sans-serif, system-ui, sans-serif`
}

function declarations(entries: [string, string | number][]) {
  return entries.map(([name, value]) => `${name}:${value};`).join('')
}

function colorDeclarations(colors: ThemeColors) {
  return declarations(Object.entries(COLOR_VARIABLES).map(([key, variable]) => [variable, colors[key as keyof ThemeColors]]))
}

/**
 * Turns a validated theme into CSS custom properties.
 * `:root:root` outranks Nuxt UI's own `:root` / `.dark` token blocks.
 */
export function themeToCss(theme: PortfolioTheme): string {
  const { typography: t, borders: b } = theme
  const shared = declarations([
    ['--theme-font-body', fontStack(t.fontFamily)],
    ['--theme-font-heading', fontStack(t.headingFontFamily)],
    ['--font-weight-normal', t.fontWeightNormal],
    ['--font-weight-medium', t.fontWeightMedium],
    ['--font-weight-semibold', t.fontWeightSemibold],
    ['--font-weight-bold', t.fontWeightBold],
    ['--theme-border-width', b.width],
    ['--theme-border-style', b.style],
    ['--theme-radius-sm', `${b.radiusSm}px`],
    ['--theme-radius-md', `${b.radiusMd}px`],
    ['--theme-radius-lg', `${b.radiusLg}px`],
    ['--theme-radius-xl', `${b.radiusXl}px`],
    ['--theme-radius-card', `${b.radiusCard}px`],
    ['--theme-radius-pill', `${b.radiusFull}px`],
  ])

  return `:root:root{${shared}${colorDeclarations(theme.colors.light)}}`
    + `:root:root.dark{${colorDeclarations(theme.colors.dark)}}`
}

export function cloneTheme(theme: PortfolioTheme): PortfolioTheme {
  return structuredClone(theme)
}

function isDeepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true
  if (typeof a !== 'object' || typeof b !== 'object' || a === null || b === null) return false
  const keys = Object.keys(a)
  return keys.length === Object.keys(b).length
    && keys.every(key => isDeepEqual((a as Record<string, unknown>)[key], (b as Record<string, unknown>)[key]))
}

/** Structural comparison, independent of key order. */
export function isSameTheme(a: PortfolioTheme, b: PortfolioTheme) {
  return isDeepEqual(a, b)
}

export function hexToRgb(hex: string) {
  const value = Number.parseInt(hex.slice(1), 16)
  return `${(value >> 16) & 255} ${(value >> 8) & 255} ${value & 255}`
}
