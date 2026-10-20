/**
 * True on devices with a precise pointer that can hover, and when the user
 * has not asked for reduced motion. Gates tilt, magnetic and spotlight effects.
 * Always false until mounted, so the hydrated markup matches the server render.
 */
export function useFinePointer() {
  const mounted = useMounted()
  const fine = useMediaQuery('(hover: hover) and (pointer: fine)')
  const reduced = usePreferredReducedMotion()
  return computed(() => mounted.value && fine.value && reduced.value !== 'reduce')
}
