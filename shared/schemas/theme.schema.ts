import { z } from 'zod'
import { THEME_BORDER_STYLES, THEME_BORDER_WIDTHS, THEME_FONTS, THEME_FONT_WEIGHTS } from '../types/theme'

export const hexColorSchema = z.string().regex(/^#[0-9a-f]{6}$/i, 'Use a 6-digit hex color, e.g. #2bd4bd')

const colorsSchema = z.object({
  primary: hexColorSchema,
  secondary: hexColorSchema,
  accent: hexColorSchema,
  background: hexColorSchema,
  surface: hexColorSchema,
  text: hexColorSchema,
  textMuted: hexColorSchema,
  border: hexColorSchema,
  primaryHover: hexColorSchema,
  onPrimary: hexColorSchema,
})

const fontSchema = z.enum(THEME_FONTS)
const weightSchema = z.union(THEME_FONT_WEIGHTS.map(weight => z.literal(weight)))
const radiusSchema = (max: number) => z.number().int().min(0).max(max)

/** Validates a theme before it is applied or restored from storage. */
export const themeSchema = z.object({
  colors: z.object({ light: colorsSchema, dark: colorsSchema }),
  typography: z.object({
    fontFamily: fontSchema,
    headingFontFamily: fontSchema,
    fontWeightNormal: weightSchema,
    fontWeightMedium: weightSchema,
    fontWeightSemibold: weightSchema,
    fontWeightBold: weightSchema,
  }),
  borders: z.object({
    width: z.enum(THEME_BORDER_WIDTHS),
    style: z.enum(THEME_BORDER_STYLES),
    radiusSm: radiusSchema(16),
    radiusMd: radiusSchema(24),
    radiusLg: radiusSchema(40),
    radiusXl: radiusSchema(48),
    radiusCard: radiusSchema(48),
    radiusFull: radiusSchema(9999),
  }),
})
