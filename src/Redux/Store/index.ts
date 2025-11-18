import { configureStore } from '@reduxjs/toolkit'
import window, { WindowState } from '../Slices/WindowSlice'
import wordpress, { WordpressState } from '../Slices/WordpressSlice'
import { combineReducers } from 'redux'

const RootReducer = combineReducers({
  window,
  wordpress,
})

export interface RootState {
  wordpress: WordpressState
  window: WindowState
}

const store = configureStore({
  reducer: RootReducer,
})

export const dispatch = store.dispatch

export default store
