<script setup lang="ts">
/** Particle network behind the hero. Particles link up and drift toward the cursor. */
interface Particle { x: number, y: number, vx: number, vy: number, r: number }

const canvas = useTemplateRef<HTMLCanvasElement>('canvas')
const reduced = usePreferredReducedMotion()
const visible = useElementVisibility(canvas)
const pageVisible = useDocumentVisibility()

const LINK_DISTANCE = 130
const MOUSE_DISTANCE = 190

let particles: Particle[] = []
let width = 0
let height = 0
let frame = 0
// Particle color follows the active theme's primary ("r g b" for alpha blending)
const { activeColors } = useTheme()
const color = computed(() => hexToRgb(activeColors.value.primary))
const mouse = { x: -9999, y: -9999 }

function resize() {
  const el = canvas.value
  if (!el?.parentElement) return
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  width = el.parentElement.clientWidth
  height = el.parentElement.clientHeight
  el.width = width * dpr
  el.height = height * dpr
  el.style.width = `${width}px`
  el.style.height = `${height}px`
  el.getContext('2d')?.setTransform(dpr, 0, 0, dpr, 0, 0)

  const count = Math.min(90, Math.max(24, Math.floor((width * height) / 15000)))
  particles = Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    r: Math.random() * 1.4 + 0.8,
  }))
}

function step() {
  const ctx = canvas.value?.getContext('2d')
  if (!ctx) return
  ctx.clearRect(0, 0, width, height)

  for (const p of particles) {
    const dx = mouse.x - p.x
    const dy = mouse.y - p.y
    const dist = Math.hypot(dx, dy)
    if (dist < MOUSE_DISTANCE && dist > 0) {
      const force = (1 - dist / MOUSE_DISTANCE) * 0.012
      p.vx += (dx / dist) * force
      p.vy += (dy / dist) * force
    }
    p.vx *= 0.995
    p.vy *= 0.995
    const speed = Math.hypot(p.vx, p.vy)
    if (speed > 0.8) {
      p.vx = (p.vx / speed) * 0.8
      p.vy = (p.vy / speed) * 0.8
    }
    p.x += p.vx
    p.y += p.vy
    if (p.x < -10) p.x = width + 10
    if (p.x > width + 10) p.x = -10
    if (p.y < -10) p.y = height + 10
    if (p.y > height + 10) p.y = -10
  }

  ctx.lineWidth = 1
  for (let i = 0; i < particles.length; i++) {
    const a = particles[i]!
    for (let j = i + 1; j < particles.length; j++) {
      const b = particles[j]!
      const d = Math.hypot(a.x - b.x, a.y - b.y)
      if (d < LINK_DISTANCE) {
        ctx.strokeStyle = `rgb(${color.value} / ${(1 - d / LINK_DISTANCE) * 0.22})`
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.stroke()
      }
    }
    const md = Math.hypot(a.x - mouse.x, a.y - mouse.y)
    if (md < MOUSE_DISTANCE) {
      ctx.strokeStyle = `rgb(${color.value} / ${(1 - md / MOUSE_DISTANCE) * 0.55})`
      ctx.beginPath()
      ctx.moveTo(a.x, a.y)
      ctx.lineTo(mouse.x, mouse.y)
      ctx.stroke()
    }
    ctx.fillStyle = `rgb(${color.value} / 0.7)`
    ctx.beginPath()
    ctx.arc(a.x, a.y, a.r, 0, Math.PI * 2)
    ctx.fill()
  }

  frame = requestAnimationFrame(step)
}

const running = computed(() => visible.value && pageVisible.value === 'visible' && reduced.value !== 'reduce')

watch(running, (on) => {
  cancelAnimationFrame(frame)
  if (on) frame = requestAnimationFrame(step)
})

useEventListener('pointermove', (event: PointerEvent) => {
  const rect = canvas.value?.getBoundingClientRect()
  if (!rect) return
  mouse.x = event.clientX - rect.left
  mouse.y = event.clientY - rect.top
}, { passive: true })

useResizeObserver(() => canvas.value?.parentElement, useDebounceFn(resize, 150))

onMounted(() => {
  resize()
  if (running.value) frame = requestAnimationFrame(step)
})

onBeforeUnmount(() => cancelAnimationFrame(frame))
</script>

<template>
  <canvas
    ref="canvas"
    class="pointer-events-none absolute inset-0"
    aria-hidden="true"
  />
</template>
