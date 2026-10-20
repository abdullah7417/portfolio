export function useCommandPalette() {
  const open = useState('command-palette:open', () => false)

  function toggle() {
    open.value = !open.value
  }

  return { open, toggle }
}
