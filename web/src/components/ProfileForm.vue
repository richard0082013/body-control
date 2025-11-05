<script setup>
import { computed } from 'vue'

const props = defineProps({
  profile: {
    type: Object,
    required: true,
  },
})

const emit = defineEmits(['update', 'reset'])

const bmi = computed(() => {
  const height = Number(props.profile.height)
  const weight = Number(props.profile.weight)
  if (!height || !weight) return null
  const heightM = height / 100
  return +(weight / (heightM * heightM)).toFixed(1)
})

const bmiLevel = computed(() => {
  if (!bmi.value) return ''
  if (bmi.value >= 30) return '肥胖 III 级（需严控能量）'
  if (bmi.value >= 28) return '肥胖 II 级（加强控糖减脂）'
  if (bmi.value >= 24) return '超重（配合运动减脂）'
  return '正常范围'
})

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
      <h2>身体情况与目标</h2>
      <button type="button" class="profile-form__reset" @click="emit('reset')">
        恢复默认
      </button>
    </header>

    <div class="profile-form__grid">
      <label class="profile-form__field">
        <span>身高 (cm)</span>
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
        <span>体重 (kg)</span>
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
        <span>血糖情况</span>
        <select :value="profile.diabetesType" @change="handleSelect('diabetesType', $event)">
          <option value="none">无糖尿病</option>
          <option value="pre">糖调受损 / 前期</option>
          <option value="type2">2 型糖尿病</option>
        </select>
      </label>

      <label class="profile-form__field profile-form__checkbox">
        <input
          type="checkbox"
          :checked="profile.hasHypertension"
          @change="handleCheckbox('hasHypertension', $event)"
        />
        <span>存在高血压或血压波动</span>
      </label>

      <label class="profile-form__field profile-form__checkbox">
        <input
          type="checkbox"
          :checked="profile.takesMedication"
          @change="handleCheckbox('takesMedication', $event)"
        />
        <span>正在按医嘱服药</span>
      </label>

      <label class="profile-form__field">
        <span>当前运动习惯</span>
        <select :value="profile.activityLevel" @change="handleSelect('activityLevel', $event)">
          <option value="gentle">温和（刚起步/恢复期）</option>
          <option value="moderate">适中（每周 3-4 次）</option>
          <option value="progressive">进阶（每周 ≥5 次）</option>
        </select>
      </label>

      <label class="profile-form__field">
        <span>主要目标</span>
        <select :value="profile.goal" @change="handleSelect('goal', $event)">
          <option value="metabolic">控糖控压，整体代谢改善</option>
          <option value="weight-loss">减脂与体重管理</option>
          <option value="fitness">提升体能与肌力</option>
        </select>
      </label>
    </div>

    <aside class="profile-form__insight" aria-live="polite">
      <p>
        当前 BMI：
        <strong v-if="bmi">{{ bmi }}</strong>
        <span v-else>未计算</span>
      </p>
      <p v-if="bmi">{{ bmiLevel }}</p>
      <p class="profile-form__hint">
        调整上述信息将自动重新生成训练与饮食建议，所有更改会在本地保存。
      </p>
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
