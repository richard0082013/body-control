import { reactive, watch } from 'vue'

const STORAGE_KEY = 'body-control/profile/v1'

const defaultProfile = {
  height: 177,
  weight: 109,
  diabetesType: 'type2', // type2 | pre | none
  hasHypertension: true,
  takesMedication: true,
  activityLevel: 'gentle', // gentle | moderate | progressive
  goal: 'metabolic', // metabolic | weight-loss | fitness
}

function loadProfile() {
  if (typeof window === 'undefined') {
    return { ...defaultProfile }
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return { ...defaultProfile }
    }
    const parsed = JSON.parse(raw)
    return {
      ...defaultProfile,
      ...parsed,
    }
  } catch (error) {
    console.warn('无法读取用户体况信息，使用默认配置。', error)
    return { ...defaultProfile }
  }
}

export function useUserProfile() {
  const profile = reactive(loadProfile())

  function updateProfile(partial) {
    Object.assign(profile, partial)
  }

  function resetProfile() {
    Object.assign(profile, { ...defaultProfile })
  }

  if (typeof window !== 'undefined') {
    watch(
      profile,
      (value) => {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
      },
      { deep: true },
    )
  }

  return {
    profile,
    updateProfile,
    resetProfile,
    defaultProfile,
  }
}

