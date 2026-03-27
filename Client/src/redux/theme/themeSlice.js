import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isDark: localStorage.getItem('darkMode') === 'true',
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDark = !state.isDark
      localStorage.setItem('darkMode', String(state.isDark))
      if (state.isDark) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.remove('dark')
      }
    },
    initDarkMode: (state) => {
      if (state.isDark) {
        document.documentElement.classList.add('dark')
      }
    },
  },
})

export const { toggleDarkMode, initDarkMode } = themeSlice.actions
export const themeReducer = themeSlice.reducer