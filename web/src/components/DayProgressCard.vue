<script setup>
import { computed } from 'vue'
import ExerciseVisual from './ExerciseVisual.vue'
import { exerciseById, exerciseVisuals } from '../data/exerciseLibrary'

const props = defineProps({
  day: {
    type: Object,
    required: true,
  },
  progress: {
    type: Object,
    required: true,
  },
  completion: {
    type: Object,
    required: true,
  },
  isToday: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['toggle', 'updateNotes', 'reset'])

const exerciseDetails = computed(() => {
  if (!props.day.exercises || props.day.exercises.length === 0) {
    return []
  }

  return props.day.exercises
    .map((entry) => {
      const meta = exerciseById[entry.id]
      if (!meta) {
        return null
      }

      return {
        ...meta,
        prescription: entry.prescription || '',
        emphasis: entry.emphasis || '',
        visualFrames: exerciseVisuals[meta.visualId] || [],
      }
    })
    .filter(Boolean)
})

function handleToggle(segmentId) {
  emit('toggle', props.day.id, segmentId)
}

function handleNotes(event) {
  emit('updateNotes', props.day.id, event.target.value)
}

function handleReset() {
  emit('reset', props.day.id)
}
</script>

<template>
  <article
    class="day-card"
    :class="{ 'day-card--today': isToday }"
    :aria-label="`${day.label} ${day.focus}`"
  >
    <header class="day-card__header">
      <div>
        <p class="day-card__day">{{ day.label }}</p>
        <h2>{{ day.focus }}</h2>
      </div>
      <span class="day-card__completion">{{ completion.completionRate }}%</span>
    </header>

    <section class="day-card__body">
      <div class="day-card__section">
        <h3>有氧安排</h3>
        <p>{{ day.cardio }}</p>
      </div>

      <div class="day-card__section">
        <h3>动作重点</h3>
        <ul>
          <li v-for="item in day.strength" :key="item">{{ item }}</li>
        </ul>
      </div>

      <div
        v-if="exerciseDetails.length"
        class="day-card__section day-card__exercise-section"
      >
        <h3>图文示范</h3>
        <div class="exercise-grid">
          <article
            v-for="exercise in exerciseDetails"
            :key="exercise.id"
            class="exercise-card"
          >
            <header class="exercise-card__header">
              <div>
                <p class="exercise-card__name">{{ exercise.name }}</p>
                <p v-if="exercise.prescription" class="exercise-card__prescription">
                  {{ exercise.prescription }}
                </p>
              </div>
              <span v-if="exercise.emphasis" class="exercise-card__tag">
                {{ exercise.emphasis }}
              </span>
            </header>
            <ExerciseVisual
              :title="exercise.name"
              :frames="exercise.visualFrames"
            />
            <p class="exercise-card__summary">{{ exercise.summary }}</p>
            <ul class="exercise-card__steps">
              <li v-for="step in exercise.steps" :key="step">{{ step }}</li>
            </ul>
            <div class="exercise-card__tips">
              <p>小提示</p>
              <ul>
                <li v-for="tip in exercise.tips" :key="tip">{{ tip }}</li>
              </ul>
            </div>
          </article>
        </div>
      </div>

      <div class="day-card__section day-card__segment-list">
        <h3>今日检查项</h3>
        <ul>
          <li
            v-for="segment in day.segments"
            :key="segment.id"
            class="day-card__segment"
          >
            <label>
              <input
                type="checkbox"
                :checked="progress.segments[segment.id]"
                @change="handleToggle(segment.id)"
              />
              <span class="day-card__segment-content">
                <span class="day-card__segment-label">{{ segment.label }}</span>
                <span class="day-card__segment-description">{{ segment.description }}</span>
              </span>
            </label>
          </li>
        </ul>
      </div>

      <div v-if="day.reminders?.length" class="day-card__section">
        <h3>提醒</h3>
        <ul>
          <li v-for="tip in day.reminders" :key="tip">{{ tip }}</li>
        </ul>
      </div>
    </section>

    <section class="day-card__notes">
      <label>
        <span>今日感受 / 血糖备注</span>
        <textarea
          rows="3"
          :value="progress.notes"
          placeholder="记录训练时长、血糖变化、疲劳感等..."
          @input="handleNotes"
        />
      </label>
      <button type="button" class="day-card__reset" @click="handleReset">
        重置本日记录
      </button>
    </section>
  </article>
</template>

<style scoped>
.day-card {
  display: grid;
  gap: 16px;
  background: var(--surface-card);
  border: 1px solid var(--surface-border);
  border-radius: 16px;
  padding: 20px;
  box-shadow: var(--shadow-subtle);
}

.day-card--today {
  border-color: var(--accent);
  box-shadow: 0 0 0 2px var(--accent-muted), var(--shadow-soft);
}

.day-card__header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.day-card__day {
  margin: 0;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.day-card__header h2 {
  margin: 6px 0 0;
  font-size: 1.1rem;
  color: var(--text-primary);
}

.day-card__completion {
  padding: 6px 10px;
  border-radius: 999px;
  background: var(--surface-muted);
  color: var(--text-primary);
  font-weight: 600;
  min-width: 48px;
  text-align: center;
}

.day-card__body {
  display: grid;
  gap: 14px;
}

.day-card__section h3 {
  margin: 0 0 8px;
  font-size: 0.95rem;
  color: var(--text-secondary);
}

.day-card__section p {
  margin: 0;
  color: var(--text-primary);
  line-height: 1.5;
}

.day-card__section ul {
  margin: 0;
  padding-left: 20px;
  color: var(--text-primary);
  line-height: 1.5;
}

.day-card__exercise-section {
  padding: 16px;
  border-radius: 14px;
  border: 1px solid var(--surface-border);
  background: var(--surface-muted);
}

.exercise-grid {
  display: grid;
  gap: 14px;
}

@media (min-width: 640px) {
  .exercise-grid {
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  }
}

.exercise-card {
  display: grid;
  gap: 10px;
  padding: 16px;
  border-radius: 16px;
  background: var(--surface-card);
  border: 1px solid rgba(148, 163, 184, 0.36);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.6);
}

.exercise-card__header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
}

.exercise-card__name {
  margin: 0;
  font-weight: 600;
  color: var(--text-primary);
}

.exercise-card__prescription {
  margin: 4px 0 0;
  color: var(--text-muted);
  font-size: 0.85rem;
}

.exercise-card__tag {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.12);
  color: var(--accent);
  font-size: 0.75rem;
  font-weight: 600;
}

.exercise-card__summary {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.5;
}

.exercise-card__steps,
.exercise-card__tips ul {
  margin: 0;
  padding-left: 18px;
  color: var(--text-primary);
  line-height: 1.5;
  font-size: 0.9rem;
}

.exercise-card__tips {
  display: grid;
  gap: 4px;
  font-size: 0.85rem;
}

.exercise-card__tips p {
  margin: 0;
  font-weight: 600;
  color: var(--text-secondary);
}

.day-card__segment-list ul {
  list-style: none;
  padding: 0;
  display: grid;
  gap: 10px;
}

.day-card__segment label {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid var(--surface-border);
  background: var(--surface-muted);
}

.day-card__segment input {
  margin-top: 4px;
  width: 18px;
  height: 18px;
}

.day-card__segment-content {
  display: grid;
  gap: 4px;
}

.day-card__segment-label {
  font-weight: 600;
  color: var(--text-primary);
}

.day-card__segment-description {
  font-size: 0.9rem;
  color: var(--text-muted);
}

.day-card__notes {
  display: grid;
  gap: 10px;
}

.day-card__notes label {
  display: grid;
  gap: 6px;
  color: var(--text-secondary);
  font-weight: 600;
}

.day-card__notes textarea {
  resize: vertical;
  min-height: 80px;
  border-radius: 12px;
  border: 1px solid var(--surface-border);
  padding: 10px 12px;
  font: inherit;
  color: var(--text-primary);
  background: var(--surface-muted);
}

.day-card__reset {
  justify-self: flex-start;
  padding: 6px 12px;
  border-radius: 12px;
  border: 1px solid var(--surface-border);
  background: transparent;
  color: var(--text-secondary);
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.day-card__reset:hover {
  background: var(--surface-muted);
  color: var(--text-primary);
}
</style>
