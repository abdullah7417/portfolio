/** Tracks which section is in the middle of the viewport, for the nav pill. */
export function useActiveSection(ids: MaybeRefOrGetter<string[]>) {
  const active = ref('')
  const { y } = useWindowScroll()

  watch(y, (value) => {
    if (value < 200) active.value = ''
  })

  let observer: IntersectionObserver | undefined

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) active.value = entry.target.id
        }
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 },
    )

    for (const id of toValue(ids)) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
  })

  onBeforeUnmount(() => observer?.disconnect())

  return readonly(active)
}
