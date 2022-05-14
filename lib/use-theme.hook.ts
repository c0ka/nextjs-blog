import { useEffect } from "react";

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
const useTheme = () => {
  useEffect(() => {
    if (localStorage.theme === 'dark' || (
      !('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches
      )) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
  })
}

export default useTheme