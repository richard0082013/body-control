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
import { useI18n } from './composables/useI18n'

const { profile, updateProfile, resetProfile } = useUserProfile()
const { t, locale, setLocale, availableLocales } = useI18n()

const workoutPlan = computed(() => createWorkoutPlan(profile, locale.value))
const nutritionPlan = computed(() => createNutritionPlan(profile, locale.value))

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
  return today ? today.label : ''
})

const workoutGuidance = computed(() => workoutPlan.value.meta.guidance || [])
const intensityGuide = computed(() => workoutPlan.value.meta.intensityGuide)
const weeklyStepGoal = computed(() => workoutPlan.value.meta.weeklyStepGoal)

const localizedTabs = computed(() => [
  { id: 'training', label: t('tabs.training') },
  { id: 'nutrition', label: t('tabs.nutrition') },
  { id: 'profile', label: t('tabs.profile') },
])

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

const profileSummaryItems = computed(() => {
  const items = []
  items.push(
    t('app.profileSummaryItems.heightWeight', {
      height: profile.height,
      weight: profile.weight,
    }),
  )

  const bmiValue = workoutPlan.value.meta.bmi
  items.push(
    bmiValue
      ? t('app.profileSummaryItems.bmi', { value: bmiValue })
      : t('app.profileSummaryItems.bmiPending'),
  )

  const diabetesKey =
    profile.diabetesType === 'pre'
      ? 'pre'
      : profile.diabetesType === 'type2'
        ? 'type2'
        : 'none'
  items.push(t(`app.profileSummaryItems.diabetes.${diabetesKey}`))

  const hypertensionKey = profile.hasHypertension ? 'true' : 'false'
  items.push(t(`app.profileSummaryItems.hypertension.${hypertensionKey}`))

  items.push(t(`app.profileSummaryItems.goal.${profile.goal}`))

  return items
})

function localeLabel(option) {
  return t(`app.localeNames.${option.value}`)
}
</script>

<template>
  <main>
    <header class="page-header">
      <div class="page-header__titles">
        <p class="page-header__eyebrow">{{ t('app.eyebrow') }}</p>
        <h1>{{ t('app.title') }}</h1>
        <p class="page-header__description">{{ t('app.description') }}</p>
      </div>
      <div class="page-header__actions">
        <div class="locale-toggle">
          <span class="locale-toggle__label">{{ t('app.localeLabel') }}</span>
          <div class="locale-toggle__buttons" role="group" :aria-label="t('app.localeLabel')">
            <button
              v-for="option in availableLocales"
              :key="option.value"
              type="button"
              :class="['locale-toggle__button', { 'is-active': locale === option.value }]"
              :aria-pressed="locale === option.value"
              @click="setLocale(option.value)"
            >
              {{ localeLabel(option) }}
            </button>
          </div>
        </div>
        <p class="page-header__today">
          {{ t('app.today') }}<strong>{{ todayLabel }}</strong>
        </p>
      </div>
    </header>

    <nav class="tab-bar" role="tablist" :aria-label="t('app.title')">
      <button
        v-for="tab in localizedTabs"
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
      <div class="training-actions">
        <button type="button" class="reset-all" @click="resetAll">
          {{ t('app.clearProgress') }}
        </button>
      </div>
      <section class="plan-insights" :aria-label="t('app.planInsightsTitle')">
        <article class="plan-insights__card">
          <h3>{{ t('app.planInsightsTitle') }}</h3>
          <p>{{ intensityGuide }}</p>
          <ul>
            <li v-for="tip in workoutGuidance" :key="tip">{{ tip }}</li>
          </ul>
          <p class="plan-insights__footnote">
            {{
              t('app.planInsightsFootnote', {
                steps: weeklyStepGoal,
                daily: Math.round(weeklyStepGoal / 7),
              })
            }}
          </p>
        </article>
      </section>

      <WeeklyProgress :summary="summary" />

      <section class="layout-grid" :aria-label="t('tabs.training')">
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
      <NutritionPlan
        :plan="nutritionPlan.days"
        :meta="nutritionPlan.meta"
        :today-id="todayId"
      />
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
        <h3>{{ t('app.profileSummaryTitle') }}</h3>
        <ul>
          <li v-for="item in profileSummaryItems" :key="item">{{ item }}</li>
        </ul>
        <p class="profile-summary__note">{{ t('app.summaryNote') }}</p>
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

.locale-toggle {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: auto;
}

.locale-toggle__label {
  color: var(--text-muted);
  font-size: 0.85rem;
}

.locale-toggle__buttons {
  display: inline-flex;
  border: 1px solid var(--surface-border);
  border-radius: 999px;
  padding: 4px;
  background: var(--surface-card);
  box-shadow: var(--shadow-subtle);
}

.locale-toggle__button {
  padding: 6px 12px;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: var(--text-secondary);
  font-size: 0.85rem;
}

.locale-toggle__button.is-active {
  background: var(--accent);
  color: #fff;
}

.locale-toggle__button:not(.is-active):hover {
  background: var(--surface-muted);
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

.plan-insights {
  display: grid;
  gap: 16px;
}

.training-actions {
  display: flex;
  justify-content: flex-end;
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
