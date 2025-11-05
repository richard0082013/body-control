<script setup>
import { computed } from 'vue'
import WeeklyProgress from './components/WeeklyProgress.vue'
import DayProgressCard from './components/DayProgressCard.vue'
import { weeklyPlan } from './data/weeklyPlan'
import { useProgressTracker } from './composables/useProgressTracker'

const {
  progress,
  dayCompletion,
  summary,
  toggleSegment,
  updateNotes,
  resetDay,
  resetAll,
} = useProgressTracker(weeklyPlan)

const completionLookup = computed(() =>
  dayCompletion.value.reduce((acc, day) => {
    acc[day.dayId] = day
    return acc
  }, {}),
)

const weekOrder = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
const todayId = weekOrder[new Date().getDay()]

const todayLabel = computed(() => {
  const today = weeklyPlan.find((day) => day.id === todayId)
  return today ? today.label : '今天'
})

function completionFor(dayId) {
  return completionLookup.value[dayId]
}
</script>

<template>
  <main>
    <header class="page-header">
      <div class="page-header__titles">
        <p class="page-header__eyebrow">身体管理 · 每周循环</p>
        <h1>个性化家庭训练追踪</h1>
        <p class="page-header__description">
          根据当前健康状况安排的 7 天训练节奏，帮助你稳步改善血糖、血压与体能。
        </p>
      </div>
      <div class="page-header__actions">
        <p class="page-header__today">今天是：<strong>{{ todayLabel }}</strong></p>
        <button type="button" class="reset-all" @click="resetAll">
          清空本周记录
        </button>
      </div>
    </header>

    <WeeklyProgress :summary="summary" />

    <section class="layout-grid" aria-label="每日训练计划与进度">
      <DayProgressCard
        v-for="day in weeklyPlan"
        :key="day.id"
        :day="day"
        :progress="progress[day.id]"
        :completion="completionFor(day.id)"
        :is-today="day.id === todayId"
        @toggle="toggleSegment"
        @update-notes="updateNotes"
        @reset="resetDay"
      />
    </section>
  </main>
</template>

<style scoped>
.page-header {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.page-header__titles h1 {
  margin: 4px 0 6px;
  font-size: 2rem;
  color: var(--text-primary);
}

.page-header__eyebrow {
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--accent);
  font-size: 0.85rem;
  font-weight: 600;
}

.page-header__description {
  margin: 0;
  color: var(--text-muted);
  max-width: 620px;
  line-height: 1.6;
}

.page-header__actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.page-header__today {
  margin: 0;
  color: var(--text-secondary);
  font-weight: 500;
}

.page-header__today strong {
  color: var(--text-primary);
}

.reset-all {
  padding: 8px 16px;
  border-radius: 999px;
  border: 1px solid var(--surface-border);
  background: var(--surface-card);
  color: var(--text-primary);
  font-weight: 600;
  transition: background 0.2s ease, box-shadow 0.2s ease;
}

.reset-all:hover {
  background: var(--accent);
  color: #fff;
  box-shadow: 0 10px 20px rgba(37, 99, 235, 0.2);
  border-color: var(--accent);
}

@media (min-width: 768px) {
  .page-header {
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-end;
  }

  .page-header__titles {
    max-width: 640px;
  }
}
</style>
