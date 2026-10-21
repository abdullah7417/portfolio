<script setup lang="ts">
const { loaded: themeBuilderLoaded } = useThemeBuilder()
</script>

<template>
  <div class="min-h-screen overflow-x-clip bg-default text-default">
    <AppScrollProgress />
    <AppCursorSpotlight />
    <AppCommandPalette />
    <AppHeader />
    <slot />
    <AppFooter />
    <AppScrollToTop />
    <ThemeBuilderTrigger />
    <LazyThemeBuilder v-if="themeBuilderLoaded" />
  </div>
</template>
