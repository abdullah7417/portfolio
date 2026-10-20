export function useCopyToClipboard() {
  const toast = useToast()
  const { copy, isSupported } = useClipboard({ legacy: true })

  return async function copyValue(value: string, label: string) {
    try {
      if (!isSupported.value) throw new Error('Clipboard unavailable')
      await copy(value)
      toast.add({ title: `${label} copied to clipboard`, icon: 'i-lucide-check', color: 'success' })
    }
    catch {
      toast.add({ title: `Couldn't copy ${label.toLowerCase()}`, icon: 'i-lucide-x', color: 'error' })
    }
  }
}
