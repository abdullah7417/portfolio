<script setup lang="ts">
import { profile } from '~/data/portfolio'

const name = `${profile.firstName} ${profile.lastName}`

useSeo({
  title: `${name} — ${profile.title}`,
  description: `Portfolio of ${name}, ${profile.title} building responsive, user-friendly web apps with Vue.js, Nuxt and Angular.`,
  image: '/images/profile.png',
})
</script>

<template>
  <main>
    <HomeHero />
    <HomeMarquee />
    <HomeAbout />
    <HomeSkills />
    <HomeProjects />
    <HomeExperience />
    <HomeContact />
  </main>
</template>
