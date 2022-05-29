import { createContext, useContext, useEffect, useState } from "react";

/**
 * switch dark mode depending on localStorage or prefers-color-scheme.
 * @example 
 * // Whenever the user explicitly chooses light mode
 * localStorage.theme = 'light'
 * // Whenever the user explicitly chooses dark mode
 * localStorage.theme = 'dark'
 * // Whenever the user explicitly chooses to respect the OS preference
 * localStorage.removeItem('theme')
 */

interface ThemeContextProps {
  isDarkMode?: boolean
  toggleTheme: () => void
}

// New context
const ThemeContext = createContext<ThemeContextProps>({
  isDarkMode: false,
  toggleTheme: () => {},
})

/**
 * Theme hook
 * @returns isDarkMode, toggleTheme()
 */
export const useTheme = () => useContext(ThemeContext)

// setting initial theme and provide theme context
export const ThemeProvider = ({ children }: any) => {
  const [isDarkMode, setIsDarkMode] = useState(false)

  const toggleTheme = () => { setIsDarkMode(!isDarkMode)}

  useEffect(() => {
    if (localStorage.theme === 'dark' || (
      !('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches
      )) {
        document.documentElement.classList.add('dark')
        setIsDarkMode(true)
      } else {
        document.documentElement.classList.remove('dark')
        setIsDarkMode(false)
      }
  }, [])

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, }}>
      {children}
    </ThemeContext.Provider>
  )
}