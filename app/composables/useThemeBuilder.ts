export function useThemeBuilder() {
  const open = useState('theme-builder:open', () => false)
  /** Mounts the (lazy) panel only after the first open */
  const loaded = useState('theme-builder:loaded', () => false)

  function toggle() {
    loaded.value = true
    open.value = !open.value
  }

  return { open, loaded, toggle }
}
