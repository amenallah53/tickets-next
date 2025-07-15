'use client'
import React from 'react'
import { ThemeProvider } from './context/ThemeContext'
import {store,persistor} from './store/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

export default function AppProviders({children}) {
  return (
    <ThemeProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            {children}
          </PersistGate>
        </Provider>
    </ThemeProvider>
  )
}
