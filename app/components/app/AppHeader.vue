<script setup lang="ts">
import { navItems, profile } from '~/data/portfolio'

const { y } = useWindowScroll()
const scrolled = computed(() => y.value > 50)
const active = useActiveSection(navItems.map(item => item.id))
const { toggle: togglePalette } = useCommandPalette()

const menuOpen = ref(false)
onKeyStroke('Escape', () => (menuOpen.value = false))

const isMac = ref(false)
onMounted(() => (isMac.value = /Mac|iPhone|iPad/.test(navigator.userAgent)))
</script>

<template>
  <Motion
    as="header"
    class="fixed inset-x-0 top-0 z-50 transition-all duration-300"
    :class="scrolled || menuOpen ? 'glass-card rounded-none border-0 border-b border-default/50' : 'bg-transparent'"
    :initial="{ y: -100 }"
    :animate="{ y: 0 }"
    :transition="{ duration: 0.6, ease: 'easeOut' }"
  >
    <nav
      class="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:px-12"
      aria-label="Main"
    >
      <AppLogo />

      <div class="hidden items-center gap-4 md:flex">
        <ul class="flex items-center gap-1">
          <li
            v-for="item in navItems"
            :key="item.id"
            class="relative"
          >
            <a
              :href="`#${item.id}`"
              class="relative z-10 block rounded-pill px-3 py-1.5 text-sm transition-colors duration-200"
              :class="active === item.id ? 'text-primary' : 'text-muted hover:text-highlighted'"
              :aria-current="active === item.id ? 'true' : undefined"
            >
              {{ item.label }}
            </a>
            <Motion
              v-if="active === item.id"
              as="span"
              layout-id="nav-pill"
              class="absolute inset-0 rounded-pill border border-primary/20 bg-primary/10"
              :transition="{ type: 'spring', stiffness: 380, damping: 32 }"
            />
          </li>
        </ul>

        <a
          v-if="profile.resumeUrl"
          :href="profile.resumeUrl"
          download
          class="inline-flex h-9 items-center gap-2 rounded-pill border border-primary/40 px-3 text-sm text-primary transition-colors hover:bg-primary/10"
        >
          <UIcon
            name="i-lucide-download"
            class="size-3.5"
          />
          Resume
        </a>

        <button
          type="button"
          class="inline-flex h-9 items-center gap-2 rounded-pill border border-default bg-muted/50 px-3 font-mono text-xs text-muted transition-colors hover:border-primary/40 hover:text-primary"
          aria-label="Open command palette"
          @click="togglePalette"
        >
          <UIcon
            name="i-lucide-command"
            class="size-3.5"
          />
          <span class="hidden lg:inline">Search <kbd class="ms-1 opacity-70">{{ isMac ? '⌘' : 'Ctrl ' }}K</kbd></span>
        </button>

        <AppThemeToggle />
      </div>

      <div class="flex items-center gap-3 md:hidden">
        <AppThemeToggle />
        <button
          type="button"
          class="flex size-10 items-center justify-center text-highlighted"
          :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
          :aria-expanded="menuOpen"
          aria-controls="mobile-menu"
          @click="menuOpen = !menuOpen"
        >
          <UIcon
            :name="menuOpen ? 'i-lucide-x' : 'i-lucide-menu'"
            class="size-6"
          />
        </button>
      </div>
    </nav>

    <AnimatePresence>
      <Motion
        v-if="menuOpen"
        id="mobile-menu"
        as="div"
        class="overflow-hidden border-t border-default/50 md:hidden"
        :initial="{ opacity: 0, height: 0 }"
        :animate="{ opacity: 1, height: 'auto' }"
        :exit="{ opacity: 0, height: 0 }"
      >
        <ul class="flex flex-col gap-4 p-6">
          <Motion
            v-for="(item, index) in navItems"
            :key="item.id"
            as="li"
            :initial="{ opacity: 0, x: -12 }"
            :animate="{ opacity: 1, x: 0 }"
            :transition="{ delay: 0.05 * index }"
          >
            <a
              :href="`#${item.id}`"
              class="block py-1 transition-colors"
              :class="active === item.id ? 'text-primary' : 'text-muted hover:text-primary'"
              @click="menuOpen = false"
            >
              {{ item.label }}
            </a>
          </Motion>
          <Motion
            v-if="profile.resumeUrl"
            as="li"
            :initial="{ opacity: 0, x: -12 }"
            :animate="{ opacity: 1, x: 0 }"
            :transition="{ delay: 0.05 * navItems.length }"
          >
            <a
              :href="profile.resumeUrl"
              download
              class="inline-flex items-center gap-2 text-primary"
              @click="menuOpen = false"
            >
              <UIcon
                name="i-lucide-download"
                class="size-4"
              />
              Download Resume
            </a>
          </Motion>
        </ul>
      </Motion>
    </AnimatePresence>
  </Motion>
</template>
