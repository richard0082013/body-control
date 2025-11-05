<script setup>
import { toRefs } from 'vue'
import NutritionDayCard from './NutritionDayCard.vue'
import { useI18n } from '../composables/useI18n'

const props = defineProps({
  plan: {
    type: Array,
    required: true,
  },
  meta: {
    type: Object,
    default: () => ({}),
  },
  todayId: {
    type: String,
    default: '',
  },
})

const { plan, meta, todayId } = toRefs(props)
const { t } = useI18n()
</script>

<template>
  <section class="nutrition-plan" :aria-label="t('tabs.nutrition')">
    <header class="nutrition-plan__header">
      <div>
        <h2>{{ t('nutritionPlan.title') }}</h2>
        <p>
          {{ t('nutritionPlan.recommended') }}
          <strong>{{ meta.calorieTarget }} kcal</strong> ·
          {{ meta.hydration }}
        </p>
        <p>{{ meta.fibreGoal }}</p>
        <p class="nutrition-plan__doc">
          {{ t('nutritionPlan.docNote') }}
        </p>
      </div>
    </header>

    <div class="nutrition-plan__grid">
      <NutritionDayCard
        v-for="day in plan"
        :key="day.id"
        :day="day"
        :default-expanded="day.id === todayId"
      />
    </div>
  </section>
</template>

<style scoped>
.nutrition-plan {
  display: grid;
  gap: 20px;
}

.nutrition-plan__header {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.nutrition-plan__header h2 {
  margin: 0;
  font-size: 1.4rem;
  color: var(--text-primary);
}

.nutrition-plan__header p {
  margin: 0;
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.nutrition-plan__doc {
  color: var(--text-muted);
  font-size: 0.85rem;
}

.nutrition-plan__grid {
  display: grid;
  gap: 16px;
  align-items: start;
}

@media (min-width: 960px) {
  .nutrition-plan__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

</style>
