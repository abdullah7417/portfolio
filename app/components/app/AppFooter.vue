<script setup lang="ts">
import { profile } from '~/data/portfolio'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-default px-6 py-4">
    <div class="mx-auto flex max-w-6xl items-center justify-between gap-4">
      <p class="text-xs text-muted sm:text-sm">
        © {{ year }} {{ profile.firstName }} {{ profile.lastName }}. Built with ❤️
      </p>
      <ul class="flex items-center gap-5">
        <li
          v-for="social in profile.socials"
          :key="social.label"
        >
          <a
            :href="social.href"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="social.label"
            class="block text-muted transition-all hover:-translate-y-0.5 hover:text-primary"
          >
            <UIcon
              :name="social.icon"
              class="size-[18px]"
            />
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>
