import { configureStore } from '@reduxjs/toolkit'
import { render } from '@testing-library/react'
import type { ReactElement } from 'react'
import { Provider } from 'react-redux'
import { rootReducer } from '@/app/rootReducer'
import type { RootState } from '@/app/store'

export const createTestStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState as RootState,
  })

export const renderWithProviders = (
  ui: ReactElement,
  preloadedState?: Partial<RootState>,
) => {
  const store = createTestStore(preloadedState)
  return render(<Provider store={store}>{ui}</Provider>)
}
