<script setup>
import { useI18n } from '../composables/useI18n'

const props = defineProps({
  summary: {
    type: Object,
    required: true,
  },
})

const { t } = useI18n()
</script>

<template>
  <section class="weekly-progress" aria-labelledby="weekly-progress-title">
    <header class="weekly-progress__header">
      <h1 id="weekly-progress-title">{{ t('weeklyProgress.title') }}</h1>
      <p class="weekly-progress__subtitle">
        {{ t('weeklyProgress.subtitle') }}
      </p>
    </header>

    <div class="weekly-progress__bar" role="progressbar" aria-valuemin="0" aria-valuemax="100"
      :aria-valuenow="summary.completionRate">
      <div class="weekly-progress__fill" :style="{ width: `${summary.completionRate}%` }" />
    </div>

    <dl class="weekly-progress__stats">
      <div>
        <dt>{{ t('weeklyProgress.stats.completedMoves') }}</dt>
        <dd>
          {{ summary.completedSegments }}/{{ summary.totalSegments }}
        </dd>
      </div>
      <div>
        <dt>{{ t('weeklyProgress.stats.completedDays') }}</dt>
        <dd>
          {{ summary.completedDays }}/{{ summary.activeDays }}
        </dd>
      </div>
      <div>
        <dt>{{ t('weeklyProgress.stats.completionRate') }}</dt>
        <dd>{{ summary.completionRate }}%</dd>
      </div>
    </dl>
  </section>
</template>

<style scoped>
.weekly-progress {
  background: var(--surface-card);
  border: 1px solid var(--surface-border);
  border-radius: 16px;
  padding: 24px;
  display: grid;
  gap: 16px;
  box-shadow: var(--shadow-soft);
}

.weekly-progress__header h1 {
  font-size: 1.6rem;
  margin: 0;
  color: var(--text-primary);
}

.weekly-progress__subtitle {
  margin: 6px 0 0;
  color: var(--text-muted);
  font-size: 0.95rem;
}

.weekly-progress__bar {
  background: var(--surface-muted);
  border-radius: 999px;
  height: 12px;
  overflow: hidden;
}

.weekly-progress__fill {
  background: var(--accent);
  height: 100%;
  border-radius: inherit;
  transition: width 240ms ease;
}

.weekly-progress__stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
  margin: 0;
}

.weekly-progress__stats dt {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-muted);
  margin-bottom: 4px;
}

.weekly-progress__stats dd {
  margin: 0;
  font-size: 1.1rem;
  color: var(--text-primary);
  font-weight: 600;
}
</style>
