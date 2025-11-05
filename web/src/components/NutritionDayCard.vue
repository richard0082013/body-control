<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  day: {
    type: Object,
    required: true,
  },
  defaultExpanded: {
    type: Boolean,
    default: false,
  },
})

const expanded = ref(props.defaultExpanded)

function toggle() {
  expanded.value = !expanded.value
}

watch(
  () => props.defaultExpanded,
  (value) => {
    expanded.value = value
  },
)
</script>

<template>
  <article class="nutrition-card">
    <header class="nutrition-card__header">
      <div>
        <p class="nutrition-card__label">{{ day.label }}</p>
        <h3>{{ day.theme }}</h3>
      </div>
      <div class="nutrition-card__header-actions">
        <span class="nutrition-card__focus">{{ day.focus }}</span>
        <button
          type="button"
          class="nutrition-card__toggle"
          :aria-expanded="expanded"
          :aria-controls="`nutrition-body-${day.id}`"
          @click="toggle"
        >
          {{ expanded ? '收起' : '展开' }}
        </button>
      </div>
    </header>

    <div
      :id="`nutrition-body-${day.id}`"
      class="nutrition-card__body"
      v-show="expanded"
    >
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
    </div>
  </article>
</template>

<style scoped>
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

.nutrition-card__header-actions {
  display: flex;
  align-items: center;
  gap: 10px;
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

.nutrition-card__toggle {
  padding: 6px 12px;
  border-radius: 10px;
  border: 1px solid var(--surface-border);
  background: var(--surface-muted);
  color: var(--text-secondary);
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease, color 0.2s ease;
}

.nutrition-card__toggle:hover {
  background: var(--surface-border);
  color: var(--text-primary);
}

.nutrition-card__body {
  display: grid;
  gap: 14px;
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
