<script setup>
defineProps({
  plan: {
    type: Array,
    required: true,
  },
  meta: {
    type: Object,
    default: () => ({}),
  },
})
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
      <article v-for="day in plan" :key="day.id" class="nutrition-card">
        <header class="nutrition-card__header">
          <div>
            <p class="nutrition-card__label">{{ day.label }}</p>
            <h3>{{ day.theme }}</h3>
          </div>
          <span class="nutrition-card__focus">{{ day.focus }}</span>
        </header>

        <div class="nutrition-card__meals">
          <section v-for="(meal, key) in day.meals" :key="key">
            <h4>{{ meal.title }}</h4>
            <ul>
              <li v-for="item in meal.items" :key="item">{{ item }}</li>
            </ul>
            <p class="nutrition-card__tip">{{ meal.tips }}</p>
          </section>
        </div>

        <section v-if="day.snacks?.length" class="nutrition-card__snacks">
          <h4>加餐建议</h4>
          <ul>
            <li v-for="item in day.snacks" :key="item">{{ item }}</li>
          </ul>
        </section>

        <section v-if="day.notes?.length" class="nutrition-card__notes">
          <h4>提醒</h4>
          <ul>
            <li v-for="note in day.notes" :key="note">{{ note }}</li>
          </ul>
        </section>
      </article>
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
}

@media (min-width: 960px) {
  .nutrition-plan__grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

.nutrition-card {
  display: grid;
  gap: 14px;
  padding: 18px;
  border-radius: 16px;
  border: 1px solid var(--surface-border);
  background: var(--surface-card);
  box-shadow: var(--shadow-subtle);
}

.nutrition-card__header {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  align-items: flex-start;
}

.nutrition-card__label {
  margin: 0;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-size: 0.85rem;
}

.nutrition-card__header h3 {
  margin: 6px 0 0;
  font-size: 1.05rem;
  color: var(--text-primary);
}

.nutrition-card__focus {
  display: inline-flex;
  align-items: center;
  padding: 4px 8px;
  border-radius: 999px;
  background: rgba(37, 99, 235, 0.12);
  color: var(--accent);
  font-size: 0.75rem;
  font-weight: 600;
  text-align: center;
}

.nutrition-card__meals {
  display: grid;
  gap: 12px;
}

.nutrition-card__meals h4,
.nutrition-card__snacks h4,
.nutrition-card__notes h4 {
  margin: 0 0 6px;
  font-size: 0.95rem;
  color: var(--text-secondary);
}

.nutrition-card__meals ul,
.nutrition-card__snacks ul,
.nutrition-card__notes ul {
  margin: 0;
  padding-left: 18px;
  color: var(--text-primary);
  line-height: 1.45;
  font-size: 0.9rem;
}

.nutrition-card__tip {
  margin: 6px 0 0;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.nutrition-card__snacks,
.nutrition-card__notes {
  padding: 12px;
  border-radius: 12px;
  background: var(--surface-muted);
  border: 1px solid rgba(148, 163, 184, 0.3);
}
</style>
