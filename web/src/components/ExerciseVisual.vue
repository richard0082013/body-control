<script setup>
import { computed, getCurrentInstance, onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps({
  title: {
    type: String,
    default: '',
  },
  frames: {
    type: Array,
    default: () => [],
  },
  cycleDuration: {
    type: Number,
    default: 2400,
  },
})

const defaultFrame = {
  label: '准备',
  points: {
    head: { x: 50, y: 16 },
    neck: { x: 50, y: 26 },
    hip: { x: 50, y: 52 },
    leftElbow: { x: 42, y: 34 },
    leftHand: { x: 38, y: 52 },
    rightElbow: { x: 58, y: 34 },
    rightHand: { x: 62, y: 52 },
    leftKnee: { x: 46, y: 72 },
    leftFoot: { x: 46, y: 92 },
    rightKnee: { x: 54, y: 72 },
    rightFoot: { x: 54, y: 92 },
  },
  extras: [],
}

const hasMultipleFrames = computed(() => props.frames.length > 1)
const safeFrames = computed(() =>
  props.frames.length > 0 ? props.frames : [defaultFrame],
)

const frameIndex = ref(0)
const currentFrame = computed(
  () => safeFrames.value[frameIndex.value % safeFrames.value.length],
)

function getPoint(name) {
  return currentFrame.value.points?.[name] ?? defaultFrame.points[name]
}

const extras = computed(() => currentFrame.value.extras ?? [])

let frameTimer = null

function startCycle() {
  stopCycle()
  if (!hasMultipleFrames.value) {
    return
  }
  frameTimer = window.setInterval(() => {
    frameIndex.value = (frameIndex.value + 1) % safeFrames.value.length
  }, Math.max(props.cycleDuration, 1200))
}

function stopCycle() {
  if (frameTimer) {
    window.clearInterval(frameTimer)
    frameTimer = null
  }
}

onMounted(() => {
  startCycle()
})

onBeforeUnmount(() => {
  stopCycle()
})

watch(
  () => props.frames,
  () => {
    frameIndex.value = 0
    startCycle()
  },
  { deep: true },
)

const { uid } =
  getCurrentInstance() ?? { uid: Math.round((1 + Math.random()) * 1_000_000) }
const instanceId = `exercise-visual-${uid}`
const bgGradientId = `${instanceId}-bg`
const bandGradientId = `${instanceId}-band`

function resolveStroke(stroke) {
  if (!stroke) return undefined
  if (stroke === 'url(#bandGradient)') {
    return `url(#${bandGradientId})`
  }
  return stroke
}

function resolveFill(fill) {
  if (!fill) return undefined
  if (fill === 'url(#bgGradient)') {
    return `url(#${bgGradientId})`
  }
  return fill
}
</script>

<template>
  <figure class="visual">
    <svg
      :aria-label="title || currentFrame.label || '动作示意'"
      viewBox="0 0 120 120"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="0"
        y="0"
        width="120"
        height="120"
        :fill="`url(#${bgGradientId})`"
        rx="14"
      />
      <defs>
        <linearGradient :id="bgGradientId" x1="0" x2="0" y1="0" y2="1">
          <stop stop-color="#f8fafc" offset="0%" />
          <stop stop-color="#eef2ff" offset="100%" />
        </linearGradient>
        <linearGradient :id="bandGradientId" x1="0" x2="1" y1="0" y2="0">
          <stop stop-color="#93c5fd" offset="0%" />
          <stop stop-color="#1d4ed8" offset="100%" />
        </linearGradient>
      </defs>

      <g class="visual__grid" stroke="#e2e8f0" stroke-width="0.5">
        <line x1="10" x2="110" y1="100" y2="100" stroke-width="1.4" />
        <line x1="10" x2="110" y1="80" y2="80" />
        <line x1="10" x2="110" y1="60" y2="60" />
      </g>

      <g class="visual__extras" stroke="#94a3b8" stroke-width="2" stroke-linecap="round">
        <template v-for="(extra, index) in extras" :key="index">
          <rect
            v-if="extra.type === 'rect'"
            :x="extra.x"
            :y="extra.y"
            :width="extra.width"
            :height="extra.height"
            :rx="extra.rx ?? 4"
            :fill="resolveFill(extra.fill) ?? 'rgba(148, 163, 184, 0.25)'"
            :stroke="resolveStroke(extra.stroke) ?? 'rgba(148,163,184,0.4)'"
            :stroke-width="extra.strokeWidth ?? 1.6"
          />
          <line
            v-else-if="extra.type === 'line'"
            :x1="extra.x1"
            :y1="extra.y1"
            :x2="extra.x2"
            :y2="extra.y2"
            :stroke="resolveStroke(extra.stroke) ?? '#cbd5f5'"
            :stroke-width="extra.strokeWidth ?? 2"
          />
          <polyline
            v-else-if="extra.type === 'polyline'"
            :points="extra.points"
            fill="none"
            :stroke="resolveStroke(extra.stroke) ?? `url(#${bandGradientId})`"
            :stroke-width="extra.strokeWidth ?? 2.4"
            stroke-linejoin="round"
          />
          <circle
            v-else-if="extra.type === 'circle'"
            :cx="extra.cx"
            :cy="extra.cy"
            :r="extra.r"
            :fill="resolveFill(extra.fill) ?? 'rgba(148,163,184,0.15)'"
            :stroke="resolveStroke(extra.stroke) ?? 'rgba(148,163,184,0.4)'"
            :stroke-width="extra.strokeWidth ?? 1"
          />
          <text
            v-else-if="extra.type === 'text'"
            :x="extra.x"
            :y="extra.y"
            :fill="extra.fill ?? '#64748b'"
            font-size="8"
            text-anchor="middle"
          >
            {{ extra.value }}
          </text>
        </template>
      </g>

      <g
        class="visual__body"
        stroke="#1e3a8a"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
        fill="transparent"
      >
        <line
          :x1="getPoint('neck').x"
          :y1="getPoint('neck').y"
          :x2="getPoint('hip').x"
          :y2="getPoint('hip').y"
        />
        <line
          :x1="getPoint('neck').x"
          :y1="getPoint('neck').y"
          :x2="getPoint('leftElbow').x"
          :y2="getPoint('leftElbow').y"
        />
        <line
          :x1="getPoint('leftElbow').x"
          :y1="getPoint('leftElbow').y"
          :x2="getPoint('leftHand').x"
          :y2="getPoint('leftHand').y"
        />
        <line
          :x1="getPoint('neck').x"
          :y1="getPoint('neck').y"
          :x2="getPoint('rightElbow').x"
          :y2="getPoint('rightElbow').y"
        />
        <line
          :x1="getPoint('rightElbow').x"
          :y1="getPoint('rightElbow').y"
          :x2="getPoint('rightHand').x"
          :y2="getPoint('rightHand').y"
        />
        <line
          :x1="getPoint('hip').x"
          :y1="getPoint('hip').y"
          :x2="getPoint('leftKnee').x"
          :y2="getPoint('leftKnee').y"
        />
        <line
          :x1="getPoint('leftKnee').x"
          :y1="getPoint('leftKnee').y"
          :x2="getPoint('leftFoot').x"
          :y2="getPoint('leftFoot').y"
        />
        <line
          :x1="getPoint('hip').x"
          :y1="getPoint('hip').y"
          :x2="getPoint('rightKnee').x"
          :y2="getPoint('rightKnee').y"
        />
        <line
          :x1="getPoint('rightKnee').x"
          :y1="getPoint('rightKnee').y"
          :x2="getPoint('rightFoot').x"
          :y2="getPoint('rightFoot').y"
        />
        <circle
          class="visual__head"
          :cx="getPoint('head').x"
          :cy="getPoint('head').y"
          r="6"
          fill="#1d4ed8"
          stroke="#1d4ed8"
        />
      </g>
    </svg>
    <figcaption v-if="currentFrame.label" class="visual__caption">
      {{ currentFrame.label }}
    </figcaption>
  </figure>
</template>

<style scoped>
.visual {
  margin: 0;
  display: grid;
  gap: 6px;
  justify-items: center;
}

svg {
  width: 160px;
  height: 160px;
}

.visual__caption {
  font-size: 0.8rem;
  color: var(--text-muted);
}
</style>
