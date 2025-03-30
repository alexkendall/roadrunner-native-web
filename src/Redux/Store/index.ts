import { configureStore } from '@reduxjs/toolkit'
import window, { WindowState } from '../Slices/WindowSlice'
import wordpress, { WordpressState } from '../Slices/WordpressSlice'
import navigation, {NavigationState} from '../Slices/NavigationSlice'
import { combineReducers } from 'redux'

const RootReducer = combineReducers({
  window,
  wordpress,
  navigation
})

export interface RootState {
  wordpress: WordpressState
  window: WindowState
  navigation: NavigationState
}

const store = configureStore({
  reducer: RootReducer,
})

export const dispatch = store.dispatch

export default store
