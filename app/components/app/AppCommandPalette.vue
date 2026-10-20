<script setup lang="ts">
import type { CommandPaletteGroup, CommandPaletteItem } from '@nuxt/ui'
import { navItems, profile, projects } from '~/data/portfolio'

const { open, toggle } = useCommandPalette()
const colorMode = useColorMode()
const copyValue = useCopyToClipboard()

defineShortcuts({
  meta_k: {
    usingInput: true,
    handler: toggle,
  },
})

/** Close first, then run the action once the dialog has animated out. */
function run(action: () => void) {
  open.value = false
  setTimeout(action, 120)
}

function openUrl(url: string) {
  window.open(url, '_blank', 'noopener,noreferrer')
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const github = profile.socials.find(social => social.label === 'GitHub')
const linkedin = profile.socials.find(social => social.label === 'LinkedIn')

const groups = computed<CommandPaletteGroup<CommandPaletteItem>[]>(() => {
  const isDark = colorMode.value === 'dark'
  const actions: CommandPaletteItem[] = [
    {
      label: isDark ? 'Switch to light mode' : 'Switch to dark mode',
      icon: isDark ? 'i-lucide-sun' : 'i-lucide-moon',
      onSelect: () => run(() => (colorMode.preference = isDark ? 'light' : 'dark')),
    },
    ...(profile.resumeUrl
      ? [{ label: 'Download resume', icon: 'i-lucide-download', onSelect: () => run(() => openUrl(profile.resumeUrl!)) }]
      : []),
    { label: 'Copy email', icon: 'i-lucide-copy', onSelect: () => run(() => copyValue(profile.email, 'Email')) },
    { label: 'Send an email', icon: 'i-lucide-mail', onSelect: () => run(() => (window.location.href = `mailto:${profile.email}`)) },
    ...(linkedin ? [{ label: 'Open LinkedIn', icon: linkedin.icon, onSelect: () => run(() => openUrl(linkedin.href)) }] : []),
    ...(github ? [{ label: 'Open GitHub', icon: github.icon, onSelect: () => run(() => openUrl(github.href)) }] : []),
  ]

  return [
    {
      id: 'navigate',
      label: 'Navigate',
      items: navItems.map(item => ({
        label: item.label,
        icon: item.icon,
        onSelect: () => run(() => scrollToId(item.id)),
      })),
    },
    {
      id: 'projects',
      label: 'Projects',
      items: projects.map(project => ({
        label: `${project.emoji}  ${project.title}`,
        suffix: project.subtitle,
        trailingIcon: project.liveUrl ? 'i-lucide-arrow-up-right' : undefined,
        onSelect: () => run(() => (project.liveUrl ? openUrl(project.liveUrl) : scrollToId('projects'))),
      })),
    },
    { id: 'actions', label: 'Actions', items: actions },
  ]
})
</script>

<template>
  <UModal
    v-model:open="open"
    title="Command palette"
    description="Search for a section, project, or action."
    :ui="{
      overlay: 'bg-black/80',
      content: 'glass-card max-w-xl overflow-hidden rounded-2xl p-0 sm:rounded-2xl',
    }"
  >
    <template #content>
      <UCommandPalette
        :groups="groups"
        placeholder="Type a command or search…"
        class="h-[min(440px,80vh)]"
        :ui="{
          root: 'bg-transparent',
          input: '[&>input]:h-12',
          label: 'font-mono text-xs text-muted',
          itemLeadingIcon: 'text-primary',
        }"
      />
      <div class="flex justify-between border-t border-default px-4 py-2 font-mono text-xs text-muted">
        <span>↑↓ navigate · ↵ select</span>
        <span>esc close</span>
      </div>
    </template>
  </UModal>
</template>
