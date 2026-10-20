<template>
  <div class="min-h-screen overflow-x-clip bg-default text-default">
    <AppScrollProgress />
    <AppCursorSpotlight />
    <AppCommandPalette />
    <AppHeader />
    <slot />
    <AppFooter />
    <AppScrollToTop />
  </div>
</template>
