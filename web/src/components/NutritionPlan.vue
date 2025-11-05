<script setup>
import { toRefs } from 'vue'
import NutritionDayCard from './NutritionDayCard.vue'

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
</script>

<template>
  <section class="nutrition-plan" aria-label="每周饮食建议">
    <header class="nutrition-plan__header">
      <div>
        <h2>饮食指导</h2>
        <p>
          推荐热量：
          <strong>{{ meta.calorieTarget }} kcal</strong> ·
          {{ meta.hydration }}
        </p>
        <p>{{ meta.fibreGoal }}</p>
        <p class="nutrition-plan__doc">
          更详细的食材替换与准备建议见 `docs/nutrition-plan.md`。
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
