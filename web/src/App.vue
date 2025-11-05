<script setup>
import { computed, ref } from 'vue'
import WeeklyProgress from './components/WeeklyProgress.vue'
import DayProgressCard from './components/DayProgressCard.vue'
import ProfileForm from './components/ProfileForm.vue'
import NutritionPlan from './components/NutritionPlan.vue'
import { createWorkoutPlan } from './data/workoutPlan'
import { createNutritionPlan } from './data/nutritionPlan'
import { useProgressTracker } from './composables/useProgressTracker'
import { useUserProfile } from './composables/useUserProfile'

const { profile, updateProfile, resetProfile } = useUserProfile()

const workoutPlan = computed(() => createWorkoutPlan(profile))
const nutritionPlan = computed(() => createNutritionPlan(profile))

const workoutDays = computed(() => workoutPlan.value.days || [])

const {
  progress,
  dayCompletion,
  summary,
  toggleSegment,
  updateNotes,
  resetDay,
  resetAll,
} = useProgressTracker(workoutDays)

const completionLookup = computed(() =>
  dayCompletion.value.reduce((acc, day) => {
    acc[day.dayId] = day
    return acc
  }, {}),
)

const weekOrder = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
const todayId = weekOrder[new Date().getDay()]

const todayLabel = computed(() => {
  const today = workoutDays.value.find((day) => day.id === todayId)
  return today ? today.label : '今天'
})

const workoutGuidance = computed(() => workoutPlan.value.meta.guidance || [])
const intensityGuide = computed(() => workoutPlan.value.meta.intensityGuide)
const weeklyStepGoal = computed(() => workoutPlan.value.meta.weeklyStepGoal)

const tabs = [
  { id: 'training', label: '训练计划' },
  { id: 'nutrition', label: '饮食计划' },
  { id: 'profile', label: '身体信息' },
]

const activeTab = ref('training')

function completionFor(dayId) {
  return completionLookup.value[dayId] || {
    completionRate: 0,
    total: 0,
    completed: 0,
  }
}

function handleProfileUpdate(partial) {
  updateProfile(partial)
}

function setActiveTab(tabId) {
  activeTab.value = tabId
}
</script>

<template>
  <main>
    <header class="page-header">
      <div class="page-header__titles">
        <p class="page-header__eyebrow">身体管理 · 每周循环</p>
        <h1>个性化训练与饮食助手</h1>
        <p class="page-header__description">
          根据当前身体情况生成 7 天训练与三餐计划。调整健康信息会自动更新建议，并保存在本地。
        </p>
      </div>
      <div class="page-header__actions">
        <p class="page-header__today">今天是：<strong>{{ todayLabel }}</strong></p>
        <button
          v-if="activeTab === 'training'"
          type="button"
          class="reset-all"
          @click="resetAll"
        >
          清空本周训练记录
        </button>
      </div>
    </header>

    <nav class="tab-bar" role="tablist" aria-label="内容分类">
      <button
        v-for="tab in tabs"
        :id="`tab-${tab.id}`"
        :key="tab.id"
        :class="['tab-bar__button', { 'is-active': activeTab === tab.id }]"
        role="tab"
        :aria-selected="activeTab === tab.id"
        :aria-controls="`panel-${tab.id}`"
        type="button"
        @click="setActiveTab(tab.id)"
      >
        {{ tab.label }}
      </button>
    </nav>

    <section
      v-if="activeTab === 'training'"
      :id="`panel-training`"
      class="tab-panel"
      role="tabpanel"
      aria-labelledby="tab-training"
    >
      <section class="plan-insights" aria-label="训练总体提示">
        <article class="plan-insights__card">
          <h3>训练强度提示</h3>
          <p>{{ intensityGuide }}</p>
          <ul>
            <li v-for="tip in workoutGuidance" :key="tip">{{ tip }}</li>
          </ul>
          <p class="plan-insights__footnote">
            周步数目标：{{ weeklyStepGoal }} 步（平均每日 {{ Math.round(weeklyStepGoal / 7) }} 步）
          </p>
        </article>
      </section>

      <WeeklyProgress :summary="summary" />

      <section class="layout-grid" aria-label="每日训练计划与进度">
        <DayProgressCard
          v-for="day in workoutDays"
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
    </section>

    <section
      v-else-if="activeTab === 'nutrition'"
      :id="`panel-nutrition`"
      class="tab-panel"
      role="tabpanel"
      aria-labelledby="tab-nutrition"
    >
      <NutritionPlan :plan="nutritionPlan.days" :meta="nutritionPlan.meta" />
    </section>

    <section
      v-else
      :id="`panel-profile`"
      class="tab-panel"
      role="tabpanel"
      aria-labelledby="tab-profile"
    >
      <ProfileForm :profile="profile" @update="handleProfileUpdate" @reset="resetProfile" />
      <article class="profile-summary">
        <h3>当前体况摘要</h3>
        <ul>
          <li>身高：{{ profile.height }} cm · 体重：{{ profile.weight }} kg</li>
          <li>血糖状况：{{ profile.diabetesType === 'none' ? '无糖尿病' : profile.diabetesType === 'pre' ? '糖调受损 / 前期' : '2 型糖尿病' }}</li>
          <li>血压情况：{{ profile.hasHypertension ? '有高血压/波动，需密切监测' : '血压正常范围' }}</li>
          <li>训练目标：{{ profile.goal === 'weight-loss' ? '减脂与体重管理' : profile.goal === 'fitness' ? '提升体能与肌力' : '控糖控压，整体代谢改善' }}</li>
        </ul>
        <p class="profile-summary__note">
          体况调整后，训练与饮食建议会重新生成；若出现异常症状，务必先咨询医生或运动康复师。
        </p>
      </article>
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
  max-width: 640px;
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

.plan-insights {
  display: grid;
  gap: 16px;
}

.tab-bar {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 12px;
  margin: 24px 0 12px;
  padding: 6px;
  border-radius: 999px;
  border: 1px solid var(--surface-border);
  background: var(--surface-card);
  box-shadow: var(--shadow-subtle);
}

.tab-bar__button {
  padding: 8px 18px;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: var(--text-secondary);
  font-weight: 600;
  transition: background 0.2s ease, color 0.2s ease, box-shadow 0.2s ease;
}

.tab-bar__button:is(:hover, :focus-visible) {
  background: var(--surface-muted);
  color: var(--text-primary);
  outline: none;
}

.tab-bar__button.is-active {
  background: var(--accent);
  color: #fff;
  box-shadow: 0 10px 18px rgba(37, 99, 235, 0.18);
}

.tab-panel {
  display: grid;
  gap: 20px;
}

.plan-insights__card {
  padding: 20px;
  border-radius: 16px;
  border: 1px solid var(--surface-border);
  background: var(--surface-card);
  box-shadow: var(--shadow-subtle);
  display: grid;
  gap: 10px;
}

.plan-insights__card h3 {
  margin: 0;
  font-size: 1.1rem;
  color: var(--text-primary);
}

.plan-insights__card p {
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.5;
}

.plan-insights__card ul {
  margin: 0;
  padding-left: 18px;
  color: var(--text-primary);
  line-height: 1.5;
  font-size: 0.95rem;
}

.plan-insights__footnote {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.profile-summary {
  padding: 20px;
  border-radius: 16px;
  border: 1px solid var(--surface-border);
  background: var(--surface-card);
  box-shadow: var(--shadow-subtle);
  display: grid;
  gap: 10px;
}

.profile-summary h3 {
  margin: 0;
  font-size: 1.1rem;
  color: var(--text-primary);
}

.profile-summary ul {
  margin: 0;
  padding-left: 18px;
  color: var(--text-primary);
  line-height: 1.5;
  font-size: 0.95rem;
}

.profile-summary__note {
  margin: 0;
  color: var(--text-muted);
  font-size: 0.85rem;
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
