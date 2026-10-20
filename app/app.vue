<script setup lang="ts">
useHead({
  htmlAttrs: { lang: 'en' },
})
</script>

<template>
  <UApp :toaster="{ position: 'bottom-right' }">
    <NuxtRouteAnnouncer />
    <MotionConfig reduced-motion="user">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </MotionConfig>
  </UApp>
</template>
