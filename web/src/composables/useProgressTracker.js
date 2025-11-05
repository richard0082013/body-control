import { computed, isRef, reactive, ref, watch } from 'vue'

const STORAGE_KEY = 'body-control/progress/v1'

function createInitialState(plan) {
  const baseState = {}
  plan.forEach((day) => {
    const segmentState = {}
    ;(day.segments || []).forEach((segment) => {
      segmentState[segment.id] = false
    })

    baseState[day.id] = {
      segments: segmentState,
      notes: '',
    }
  })

  return baseState
}

function loadPersistedState(plan) {
  const fallback = createInitialState(plan)

  if (typeof window === 'undefined') {
    return fallback
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) {
      return fallback
    }

    const parsed = JSON.parse(raw)

    // 保持与最新计划同步，新增的 segment 会补齐，删除的会移除
    plan.forEach((day) => {
      if (!parsed[day.id]) {
        parsed[day.id] = fallback[day.id]
        return
      }

      day.segments.forEach((segment) => {
        if (typeof parsed[day.id].segments[segment.id] !== 'boolean') {
          parsed[day.id].segments[segment.id] = false
        }
      })

      Object.keys(parsed[day.id].segments).forEach((segmentId) => {
        const stillExists = day.segments.some(
          (segment) => segment.id === segmentId,
        )
        if (!stillExists) {
          delete parsed[day.id].segments[segmentId]
        }
      })
    })

    return parsed
  } catch (error) {
    console.warn('无法读取本地训练进度，使用默认初始值。', error)
    return fallback
  }
}

function syncStateWithPlan(state, plan) {
  const seenDayIds = new Set()

  plan.forEach((day) => {
    seenDayIds.add(day.id)
    if (!state[day.id]) {
      state[day.id] = {
        segments: {},
        notes: '',
      }
    }

    const segments = state[day.id].segments
    const requiredSegments = new Set()

    ;(day.segments || []).forEach((segment) => {
      requiredSegments.add(segment.id)
      if (typeof segments[segment.id] !== 'boolean') {
        segments[segment.id] = false
      }
    })

    Object.keys(segments).forEach((segmentId) => {
      if (!requiredSegments.has(segmentId)) {
        delete segments[segmentId]
      }
    })
  })

  Object.keys(state).forEach((dayId) => {
    if (!seenDayIds.has(dayId)) {
      delete state[dayId]
    }
  })
}

export function useProgressTracker(planInput) {
  const planRef = isRef(planInput) ? planInput : ref(planInput)
  const initialPlan = Array.isArray(planRef.value) ? planRef.value : []
  const state = reactive(loadPersistedState(initialPlan))

  syncStateWithPlan(state, initialPlan)

  const dayCompletion = computed(() =>
    (planRef.value || []).map((day) => {
      if (!state[day.id]) {
        state[day.id] = {
          segments: {},
          notes: '',
        }
      }
      const segmentEntries = Object.entries(state[day.id].segments || {})
      const total = segmentEntries.length
      const completed = segmentEntries.filter(([, value]) => value).length
      const completionRate = total === 0 ? 0 : Math.round((completed / total) * 100)

      return {
        dayId: day.id,
        label: day.label,
        completed,
        total,
        completionRate,
        isComplete: completionRate === 100,
      }
    }),
  )

  const summary = computed(() => {
    const aggregate = dayCompletion.value.reduce(
      (acc, day) => {
        acc.totalSegments += day.total
        acc.completedSegments += day.completed

        if (day.total > 0) {
          acc.activeDays += 1
        }

        if (day.isComplete) {
          acc.completedDays += 1
        }

        return acc
      },
      {
        totalSegments: 0,
        completedSegments: 0,
        completedDays: 0,
        activeDays: 0,
      },
    )

    return {
      ...aggregate,
      completionRate:
        aggregate.totalSegments === 0
          ? 0
          : Math.round((aggregate.completedSegments / aggregate.totalSegments) * 100),
    }
  })

  watch(
    planRef,
    (newPlan) => {
      syncStateWithPlan(state, Array.isArray(newPlan) ? newPlan : [])
    },
    { deep: true },
  )

  function toggleSegment(dayId, segmentId) {
    if (!state[dayId]) return
    state[dayId].segments[segmentId] = !state[dayId].segments[segmentId]
  }

  function updateNotes(dayId, notes) {
    if (!state[dayId]) return
    state[dayId].notes = notes
  }

  function resetDay(dayId) {
    if (!state[dayId]) return
    Object.keys(state[dayId].segments).forEach((segmentId) => {
      state[dayId].segments[segmentId] = false
    })
    state[dayId].notes = ''
  }

  function resetAll() {
    Object.keys(state).forEach((dayId) => {
      resetDay(dayId)
    })
  }

  if (typeof window !== 'undefined') {
    watch(
      state,
      (value) => {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
      },
      { deep: true },
    )
  }

  return {
    progress: state,
    dayCompletion,
    summary,
    toggleSegment,
    updateNotes,
    resetDay,
    resetAll,
  }
}
