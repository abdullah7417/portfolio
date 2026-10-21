export const THEME_FONTS = [
  'Inter',
  'Poppins',
  'Manrope',
  'DM Sans',
  'Space Grotesk',
  'Outfit',
  'Plus Jakarta Sans',
  'Sora',
] as const

export const THEME_FONT_WEIGHTS = [400, 500, 600, 700] as const
export const THEME_BORDER_WIDTHS = ['0px', '1px', '2px', '3px'] as const
export const THEME_BORDER_STYLES = ['solid', 'dashed', 'dotted'] as const

export type ThemeFont = typeof THEME_FONTS[number]
export type ThemeFontWeight = typeof THEME_FONT_WEIGHTS[number]
export type ThemeBorderWidth = typeof THEME_BORDER_WIDTHS[number]
export type ThemeBorderStyle = typeof THEME_BORDER_STYLES[number]
export type ThemeMode = 'light' | 'dark'

/** One palette. Every value is a 6-digit hex color. */
export interface ThemeColors {
  primary: string
  secondary: string
  accent: string
  background: string
  surface: string
  text: string
  textMuted: string
  border: string
  primaryHover: string
  onPrimary: string
}

export interface ThemeTypography {
  fontFamily: ThemeFont
  headingFontFamily: ThemeFont
  fontWeightNormal: ThemeFontWeight
  fontWeightMedium: ThemeFontWeight
  fontWeightSemibold: ThemeFontWeight
  fontWeightBold: ThemeFontWeight
}

/** Radii are in px. */
export interface ThemeBorders {
  width: ThemeBorderWidth
  style: ThemeBorderStyle
  radiusSm: number
  radiusMd: number
  radiusLg: number
  radiusXl: number
  radiusCard: number
  radiusFull: number
}

export interface PortfolioTheme {
  colors: Record<ThemeMode, ThemeColors>
  typography: ThemeTypography
  borders: ThemeBorders
}

export interface ThemePreset {
  id: string
  name: string
  description: string
  /** Switches the site to this color mode when the preset is applied */
  colorMode?: ThemeMode
  theme: PortfolioTheme
}
