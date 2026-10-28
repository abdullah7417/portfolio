<script setup lang="ts">
import { profile } from '~/data/portfolio'
</script>

<template>
  <a
    href="#"
    class="text-gradient font-mono text-xl font-bold"
    :aria-label="`${profile.firstName} ${profile.lastName}, back to top`"
  >
    {{ profile.logo }}
    
  </a>
  
</template>
