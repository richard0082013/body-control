import { computed, reactive, watch } from 'vue'

const STORAGE_KEY = 'body-control/progress/v1'

function createInitialState(plan) {
  const baseState = {}
  plan.forEach((day) => {
    const segmentState = {}
    day.segments.forEach((segment) => {
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
    })

    return parsed
  } catch (error) {
    console.warn('无法读取本地训练进度，使用默认初始值。', error)
    return fallback
  }
}

export function useProgressTracker(plan) {
  const state = reactive(loadPersistedState(plan))

  const dayCompletion = computed(() =>
    plan.map((day) => {
      const segmentEntries = Object.entries(state[day.id].segments)
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

  function toggleSegment(dayId, segmentId) {
    state[dayId].segments[segmentId] = !state[dayId].segments[segmentId]
  }

  function updateNotes(dayId, notes) {
    state[dayId].notes = notes
  }

  function resetDay(dayId) {
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
