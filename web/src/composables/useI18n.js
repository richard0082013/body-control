import { computed, reactive, ref, watch } from 'vue'
import { localeOptions, messages } from '../i18n/messages'

const STORAGE_KEY = 'body-control/locale'
const defaultLocale = 'zh'

const storedLocale =
  typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null

const activeLocale = ref(
  storedLocale && messages[storedLocale] ? storedLocale : defaultLocale,
)

if (typeof window !== 'undefined') {
  watch(
    activeLocale,
    (value) => {
      window.localStorage.setItem(STORAGE_KEY, value)
      const html = document.documentElement
      if (html) {
        html.setAttribute('lang', value === 'en' ? 'en' : 'zh-Hans')
      }
    },
    { immediate: true },
  )
}

function resolvePath(path, locale) {
  const parts = path.split('.')
  let current = messages[locale] ?? messages[defaultLocale]
  for (const part of parts) {
    if (current && Object.prototype.hasOwnProperty.call(current, part)) {
      current = current[part]
    } else {
      current = null
      break
    }
  }
  return current
}

function formatMessage(message, params) {
  if (!params) return message
  return message.replace(/\{(\w+)\}/g, (_, key) =>
    params[key] != null ? params[key] : `{${key}}`,
  )
}

export function useI18n() {
  const availableLocales = reactive(localeOptions)

  function setLocale(value) {
    if (messages[value]) {
      activeLocale.value = value
    }
  }

  function t(path, params) {
    const locale = activeLocale.value
    const resolved =
      resolvePath(path, locale) ?? resolvePath(path, defaultLocale) ?? path
    if (typeof resolved === 'string') {
      return formatMessage(resolved, params)
    }
    return resolved
  }

  return {
    locale: activeLocale,
    setLocale,
    t,
    availableLocales: computed(() => availableLocales),
  }
}

