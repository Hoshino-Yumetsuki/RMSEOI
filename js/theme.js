(() => {
  'use strict'
  const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  const setTheme = theme => {
    document.documentElement.setAttribute('data-bs-theme', theme)
  }
  setTheme(getSystemTheme())
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    setTheme(getSystemTheme())
  })
})()
