<script setup lang="ts">
import { profile } from '~/data/portfolio'

const section = useTemplateRef<HTMLElement>('section')
const reduced = usePreferredReducedMotion()
const { toggle: togglePalette } = useCommandPalette()

const { scrollYProgress } = useScroll({ target: section, offset: ['start start', 'end start'] })
const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
const contentOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
const blobOneY = useTransform(scrollYProgress, [0, 1], ['0%', '-35%'])
const blobTwoY = useTransform(scrollYProgress, [0, 1], ['0%', '45%'])

const isMac = ref(false)
onMounted(() => (isMac.value = /Mac|iPhone|iPad/.test(navigator.userAgent)))

const fadeUp = { opacity: 0, y: 20 }
const shown = { opacity: 1, y: 0 }
const heroSocials = computed(() => [
  ...profile.socials.filter(social => social.label === 'GitHub' || social.label === 'LinkedIn'),
  { label: 'Email', href: `mailto:${profile.email}`, icon: 'i-lucide-mail' },
])
</script>

<template>
  <section
    ref="section"
    class="relative flex min-h-screen items-center justify-center overflow-hidden"
  >
    <div
      class="absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div class="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
      <ClientOnly>
        <HomeHeroCanvas />
      </ClientOnly>

      <Motion
        as="div"
        class="absolute top-1/4 left-1/4 size-96"
        :style="reduced === 'reduce' ? undefined : { y: blobOneY }"
      >
        <Motion
          as="div"
          class="size-full rounded-full opacity-30 blur-2xl [background:radial-gradient(circle,color-mix(in_oklab,var(--ui-primary)_45%,transparent),transparent_70%)]"
          :animate="reduced === 'reduce' ? undefined : { x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }"
          :transition="{ duration: 20, repeat: Infinity, ease: 'easeInOut' }"
        />
      </Motion>
      <Motion
        as="div"
        class="absolute right-1/4 bottom-1/4 size-80"
        :style="reduced === 'reduce' ? undefined : { y: blobTwoY }"
      >
        <Motion
          as="div"
          class="size-full rounded-full opacity-25 blur-2xl [background:radial-gradient(circle,color-mix(in_oklab,var(--ui-secondary)_45%,transparent),transparent_70%)]"
          :animate="reduced === 'reduce' ? undefined : { x: [0, -20, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }"
          :transition="{ duration: 25, repeat: Infinity, ease: 'easeInOut' }"
        />
      </Motion>

      <div class="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-(--ui-bg) to-transparent" />
    </div>

    <Motion
      as="div"
      class="relative z-10 max-w-4xl px-6 text-center"
      :style="reduced === 'reduce' ? undefined : { y: contentY, opacity: contentOpacity }"
    >
      <Motion
        as="p"
        class="mb-4 font-mono text-sm text-primary md:text-base"
        :initial="fadeUp"
        :animate="shown"
        :transition="{ delay: 0.2 }"
      >
        Hello, I'm
      </Motion>

      <h1 class="mb-6 text-5xl font-bold tracking-tight text-highlighted md:text-7xl lg:text-8xl">
        <AppSplitWords
          :text="profile.firstName"
          trigger="mount"
          :delay="0.35"
        />
        {{ ' ' }}
        <AppSplitWords
          :text="profile.lastName"
          trigger="mount"
          :delay="0.5"
          word-class="text-gradient"
        />
      </h1>

      <Motion
        as="p"
        class="mb-10 h-8 text-xl text-muted md:text-2xl"
        :initial="fadeUp"
        :animate="shown"
        :transition="{ delay: 0.8 }"
      >
        <HomeTypewriter :phrases="profile.roles" />
      </Motion>

      <Motion
        as="div"
        class="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        :initial="fadeUp"
        :animate="shown"
        :transition="{ delay: 1 }"
      >
        <AppMagnetic>
          <a
            href="#projects"
            class="btn-gradient group inline-flex items-center gap-2 rounded-pill px-8 py-3 font-medium"
          >
            View Projects
            <UIcon
              name="i-lucide-arrow-right"
              class="size-[18px] transition-transform group-hover:translate-x-1"
            />
          </a>
        </AppMagnetic>
        <AppMagnetic>
          <a
            href="#contact"
            class="inline-block rounded-pill border border-primary px-8 py-3 font-medium text-primary transition-colors duration-300 hover:bg-primary/10"
          >
            Contact Me
          </a>
        </AppMagnetic>
        <AppMagnetic v-if="profile.resumeUrl">
          <a
            :href="profile.resumeUrl"
            download
            class="group inline-flex items-center gap-2 rounded-pill border border-default px-8 py-3 font-medium text-highlighted transition-colors duration-300 hover:border-primary hover:text-primary"
          >
            <UIcon
              name="i-lucide-download"
              class="size-[18px] transition-transform group-hover:translate-y-0.5"
            />
            Download CV
          </a>
        </AppMagnetic>
      </Motion>

      <Motion
        as="div"
        class="flex flex-col items-center gap-6"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ delay: 1.2 }"
      >
        <ul class="flex items-center gap-6">
          <li
            v-for="social in heroSocials"
            :key="social.label"
          >
            <a
              :href="social.href"
              :target="social.href.startsWith('http') ? '_blank' : undefined"
              rel="noopener noreferrer"
              :aria-label="social.label"
              class="block text-muted transition-all duration-200 hover:-translate-y-0.5 hover:text-primary"
            >
              <UIcon
                :name="social.icon"
                class="size-[22px]"
              />
            </a>
          </li>
        </ul>
        <button
          type="button"
          class="hidden items-center gap-2 rounded-pill border border-default bg-muted/40 px-4 py-1.5 font-mono text-xs text-muted transition-colors hover:border-primary/40 hover:text-primary sm:inline-flex"
          @click="togglePalette"
        >
          <UIcon
            name="i-lucide-command"
            class="size-[13px]"
          />
          Press
          <kbd class="rounded-sm bg-muted px-1.5 py-0.5">{{ isMac ? '⌘' : 'Ctrl' }}</kbd>
          <kbd class="rounded-sm bg-muted px-1.5 py-0.5">K</kbd>
          to explore
        </button>
      </Motion>
    </Motion>

    <Motion
      as="a"
      href="#about"
      aria-label="Scroll to About"
      class="absolute bottom-8 left-1/2 -translate-x-1/2"
      :initial="{ opacity: 0 }"
      :animate="{ opacity: 1 }"
      :transition="{ delay: 1.4 }"
    >
      <Motion
        as="div"
        :animate="reduced === 'reduce' ? undefined : { y: [0, 10, 0] }"
        :transition="{ duration: 2, repeat: Infinity }"
      >
        <UIcon
          name="i-lucide-arrow-down"
          class="size-5 text-muted"
        />
      </Motion>
    </Motion>
  </section>
</template>
