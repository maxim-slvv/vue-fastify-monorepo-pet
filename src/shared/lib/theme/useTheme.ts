export type Accent = 'blue' | 'green' | 'red' | 'purple'

const THEME_KEY = 'theme'
const ACCENT_KEY = 'accent'

export function useTheme() {
  const setDark = (on: boolean) => {
    document.documentElement.classList.toggle('dark', on)
    localStorage.setItem(THEME_KEY, on ? 'dark' : 'light')
  }

  const setAccent = (accent: Accent) => {
    document.documentElement.setAttribute('data-accent', accent)
    localStorage.setItem(ACCENT_KEY, accent)
  }

  const init = () => {
    const savedTheme = localStorage.getItem(THEME_KEY)
    setDark(savedTheme === 'dark')

    const savedAccent = (localStorage.getItem(ACCENT_KEY) as Accent) || 'blue'
    setAccent(savedAccent)
  }

  return { setDark, setAccent, init }
}

export const availableAccents: Accent[] = ['blue', 'green', 'red', 'purple']
