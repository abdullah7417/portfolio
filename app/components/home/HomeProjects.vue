<script setup lang="ts">
import type { Project } from '~~/shared/types/portfolio'
import { projects } from '~/data/portfolio'

// Filter chip label → project tags it matches
const FILTER_TAGS: Record<string, string[]> = {
  'Nuxt': ['Nuxt'],
  'Vue': ['Vue.js'],
  'JavaScript': ['JavaScript'],
  'HTML5': ['HTML'],
  'CSS3': ['CSS'],
  'TailwindCSS': ['Tailwind CSS'],
  'Blade': ['Blade'],
  'React & AI-assisted': ['React', 'AI-assisted'],
}

const filters = ['All', ...Object.keys(FILTER_TAGS)]
const activeFilter = ref('All')

const filtered = computed(() => {
  const tags = FILTER_TAGS[activeFilter.value]
  if (!tags) return projects
  return projects.filter(project => project.tags.some(tag => tags.includes(tag)))
})

const selected = shallowRef<Project | null>(null)
const modalOpen = ref(false)

function openProject(project: Project) {
  selected.value = project
  modalOpen.value = true
}
</script>

<template>
  <section
    id="projects"
    class="section-padding"
  >
    <div class="mx-auto max-w-6xl">
      <AppSectionHeading
        eyebrow="03. Projects"
        title="Things I've built"
      />

      <AppReveal
        :y="12"
        :blur="false"
      >
        <div
          class="mb-10 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter projects by technology"
        >
          <button
            v-for="filter in filters"
            :key="filter"
            type="button"
            class="relative rounded-pill px-4 py-1.5 text-sm font-medium transition-colors duration-200"
            :class="activeFilter === filter ? 'text-on-primary' : 'bg-muted text-muted hover:text-highlighted'"
            :aria-pressed="activeFilter === filter"
            @click="activeFilter = filter"
          >
            <Motion
              v-if="activeFilter === filter"
              as="span"
              layout-id="filter-pill"
              class="bg-gradient-primary absolute inset-0 rounded-pill"
              :transition="{ type: 'spring', stiffness: 400, damping: 32 }"
            />
            <span class="relative">{{ filter }}</span>
          </button>
        </div>
      </AppReveal>

      <p
        class="sr-only"
        aria-live="polite"
      >
        Showing {{ filtered.length }} projects
      </p>

      <Motion
        as="div"
        layout
        class="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout">
          <Motion
            v-for="(project, index) in filtered"
            :key="project.title"
            as="div"
            layout
            :initial="{ opacity: 0, scale: 0.9, y: 24 }"
            :animate="{ opacity: 1, scale: 1, y: 0 }"
            :exit="{ opacity: 0, scale: 0.9 }"
            :transition="{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }"
          >
            <ProjectCard
              :project="project"
              @open="openProject(project)"
            />
          </Motion>
        </AnimatePresence>
      </Motion>
    </div>

    <ProjectModal
      v-model:open="modalOpen"
      :project="selected"
    />
  </section>
</template>
