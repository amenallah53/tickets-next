'use client'
import React from 'react'
import { ThemeProvider } from './context/ThemeContext'
import store from './store/store'
import { Provider } from 'react-redux'

export default function AppProviders({children}) {
  return (
    <ThemeProvider>
        <Provider store={store}>
            {children}
        </Provider>
    </ThemeProvider>
  )
}
