<script setup>
import { computed } from 'vue'
import { useI18n } from '../composables/useI18n'

const props = defineProps({
  profile: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update', 'reset'])
const { t } = useI18n()

const bmi = computed(() => {
  const height = Number(props.profile.height)
  const weight = Number(props.profile.weight)
  if (!height || !weight) return null
  const heightM = height / 100
  return +(weight / (heightM * heightM)).toFixed(1)
})

const bmiLevelKey = computed(() => {
  if (!bmi.value) return null
  if (bmi.value >= 30) return 'obese3'
  if (bmi.value >= 28) return 'obese2'
  if (bmi.value >= 24) return 'overweight'
  return 'normal'
})

const diabetesOptions = computed(() => [
  { value: 'none', label: t('profileForm.diabetesOptions.none') },
  { value: 'pre', label: t('profileForm.diabetesOptions.pre') },
  { value: 'type2', label: t('profileForm.diabetesOptions.type2') },
])

const activityOptions = computed(() => [
  { value: 'gentle', label: t('profileForm.activityOptions.gentle') },
  { value: 'moderate', label: t('profileForm.activityOptions.moderate') },
  { value: 'progressive', label: t('profileForm.activityOptions.progressive') },
])

const goalOptions = computed(() => [
  { value: 'metabolic', label: t('profileForm.goalOptions.metabolic') },
  { value: 'weight-loss', label: t('profileForm.goalOptions.weight-loss') },
  { value: 'fitness', label: t('profileForm.goalOptions.fitness') },
])

function updateField(field, value) {
  emit('update', { [field]: value })
}

function handleNumberInput(field, event) {
  const value = Number(event.target.value)
  if (!Number.isNaN(value)) {
    updateField(field, value)
  }
}

function handleSelect(field, event) {
  updateField(field, event.target.value)
}

function handleCheckbox(field, event) {
  updateField(field, event.target.checked)
}
</script>

<template>
  <section class="profile-form">
    <header class="profile-form__header">
      <h2>{{ t('profileForm.title') }}</h2>
      <button type="button" class="profile-form__reset" @click="emit('reset')">
        {{ t('profileForm.reset') }}
      </button>
    </header>

    <div class="profile-form__grid">
      <label class="profile-form__field">
        <span>{{ t('profileForm.height') }}</span>
        <input
          type="number"
          min="120"
          max="220"
          step="1"
          :value="profile.height"
          @input="handleNumberInput('height', $event)"
        />
      </label>

      <label class="profile-form__field">
        <span>{{ t('profileForm.weight') }}</span>
        <input
          type="number"
          min="40"
          max="200"
          step="0.5"
          :value="profile.weight"
          @input="handleNumberInput('weight', $event)"
        />
      </label>

      <label class="profile-form__field">
        <span>{{ t('profileForm.diabetes') }}</span>
        <select :value="profile.diabetesType" @change="handleSelect('diabetesType', $event)">
          <option v-for="option in diabetesOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </label>

      <label class="profile-form__field profile-form__checkbox">
        <input
          type="checkbox"
          :checked="profile.hasHypertension"
          @change="handleCheckbox('hasHypertension', $event)"
        />
        <span>{{ t('profileForm.hypertension') }}</span>
      </label>

      <label class="profile-form__field profile-form__checkbox">
        <input
          type="checkbox"
          :checked="profile.takesMedication"
          @change="handleCheckbox('takesMedication', $event)"
        />
        <span>{{ t('profileForm.medication') }}</span>
      </label>

      <label class="profile-form__field">
        <span>{{ t('profileForm.activity') }}</span>
        <select :value="profile.activityLevel" @change="handleSelect('activityLevel', $event)">
          <option v-for="option in activityOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </label>

      <label class="profile-form__field">
        <span>{{ t('profileForm.goal') }}</span>
        <select :value="profile.goal" @change="handleSelect('goal', $event)">
          <option v-for="option in goalOptions" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
      </label>
    </div>

    <aside class="profile-form__insight" aria-live="polite">
      <p>
        {{ t('profileForm.bmi.label') }}
        <strong v-if="bmi">{{ bmi }}</strong>
        <span v-else>{{ t('profileForm.bmi.pending') }}</span>
      </p>
      <p v-if="bmiLevelKey">
        {{ t(`profileForm.bmi.level.${bmiLevelKey}`) }}
      </p>
      <p class="profile-form__hint">{{ t('profileForm.hint') }}</p>
    </aside>
  </section>
</template>

<style scoped>
.profile-form {
  display: grid;
  gap: 16px;
  padding: 20px;
  border-radius: 18px;
  border: 1px solid var(--surface-border);
  background: var(--surface-card);
  box-shadow: var(--shadow-subtle);
}

.profile-form__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.profile-form__header h2 {
  margin: 0;
  font-size: 1.3rem;
  color: var(--text-primary);
}

.profile-form__reset {
  padding: 6px 12px;
  border-radius: 10px;
  border: 1px solid var(--surface-border);
  background: var(--surface-muted);
  color: var(--text-secondary);
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
}

.profile-form__reset:hover {
  background: var(--surface-border);
}

.profile-form__grid {
  display: grid;
  gap: 14px;
}

@media (min-width: 720px) {
  .profile-form__grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

.profile-form__field {
  display: grid;
  gap: 6px;
  color: var(--text-secondary);
  font-size: 0.95rem;
}

.profile-form__field input,
.profile-form__field select {
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid var(--surface-border);
  background: var(--surface-muted);
  font: inherit;
  color: var(--text-primary);
}

.profile-form__checkbox {
  align-items: center;
  grid-template-columns: auto 1fr;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 12px;
  border: 1px solid var(--surface-border);
  background: var(--surface-muted);
}

.profile-form__checkbox input {
  width: 18px;
  height: 18px;
}

.profile-form__insight {
  padding: 14px;
  border-radius: 14px;
  background: var(--surface-muted);
  border: 1px dashed var(--surface-border);
  color: var(--text-secondary);
  font-size: 0.9rem;
  display: grid;
  gap: 6px;
}

.profile-form__insight strong {
  color: var(--text-primary);
}

.profile-form__hint {
  margin: 0;
  color: var(--text-muted);
  font-size: 0.85rem;
}
</style>
