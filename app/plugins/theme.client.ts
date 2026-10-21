/** Restores the saved theme before hydration and keeps localStorage in sync. */
export default defineNuxtPlugin({
  name: 'theme-persistence',
  dependsOn: ['theme'],
  setup() {
    const { theme, applyTheme } = useTheme()

    function clearStorage() {
      try {
        localStorage.removeItem(THEME_STORAGE_KEY)
        localStorage.removeItem(THEME_CSS_STORAGE_KEY)
      }
      catch {
        // Storage unavailable (private mode, blocked cookies): nothing to clear
      }
    }

    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY)
      if (saved && !applyTheme(JSON.parse(saved))) clearStorage()
    }
    catch {
      clearStorage()
    }

    // Drop the pre-paint copy once the live <style> renders the restored theme
    // (the first head render can still hold the server's default theme)
    const removePrepaint = () => document.getElementById(`${THEME_STYLE_ID}-prepaint`)?.remove()
    if (isSameTheme(theme.value, DEFAULT_THEME)) removePrepaint()
    injectHead()?.hooks?.hook('dom:rendered', () => {
      if (document.getElementById(THEME_STYLE_ID)?.textContent === themeToCss(theme.value)) removePrepaint()
    })

    watchDebounced(theme, (value) => {
      if (isSameTheme(value, DEFAULT_THEME)) return clearStorage()
      try {
        localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(value))
        localStorage.setItem(THEME_CSS_STORAGE_KEY, themeToCss(value))
      }
      catch {
        // Quota exceeded or storage blocked: the theme still works for this visit
      }
    }, { deep: true, debounce: 250 })
  },
})
