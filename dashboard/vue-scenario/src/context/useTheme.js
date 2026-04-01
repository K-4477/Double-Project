import { ref, provide, inject } from 'vue'

const ThemeSymbol = Symbol()

export function provideTheme() {
  const darkMode = ref(false)
  const toggleDarkMode = () => { darkMode.value = !darkMode.value }

  provide(ThemeSymbol, { darkMode, toggleDarkMode })

  return { darkMode, toggleDarkMode }
}

export function useTheme() {
  return inject(ThemeSymbol)
}