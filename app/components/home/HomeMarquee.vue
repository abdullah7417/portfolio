<script setup lang="ts">
import { skillGroups } from '~/data/portfolio'

const skills = skillGroups.flatMap(group => group.skills)
</script>

<template>
  <section
    aria-label="Technologies I work with"
    class="relative overflow-hidden border-y border-default/60 py-6 [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]"
  >
    <div class="flex w-max animate-marquee hover:[animation-play-state:paused] motion-reduce:animate-none">
      <ul
        v-for="copy in 2"
        :key="copy"
        class="flex"
        :aria-hidden="copy === 2 ? 'true' : undefined"
      >
        <li
          v-for="skill in skills"
          :key="skill"
          class="mx-6 flex items-center gap-6 font-mono text-sm whitespace-nowrap text-muted md:text-base"
        >
          {{ skill }}
          <span
            class="size-1.5 rounded-full bg-primary/60"
            aria-hidden="true"
          />
        </li>
      </ul>
    </div>
  </section>
</template>
