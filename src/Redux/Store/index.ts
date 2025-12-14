import { configureStore } from '@reduxjs/toolkit'
import window, { WindowState } from '../Slices/WindowSlice'
import wordpress, { WordpressState } from '../Slices/WordpressSlice'
import translation, { TranslationState } from '../Slices/TranslationSlice'
import { combineReducers } from 'redux'

const RootReducer = combineReducers({
  window,
  wordpress,
  translation,
})

export interface RootState {
  wordpress: WordpressState
  window: WindowState
  translation: TranslationState
}

const store = configureStore({
  reducer: RootReducer,
})

export const dispatch = store.dispatch

export default store
