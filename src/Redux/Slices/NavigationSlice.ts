import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TAB_BREAKPOINT } from '../../Config/Device'

export interface NavigationState {
  currentRoute: string
}

const initialState: NavigationState = {
    currentRoute: ""
}


const navigationSlice = createSlice({
  name: 'navigationSlice',
  initialState,
  reducers: {
    setCurrentRoute(state, action: PayloadAction<string>) {
        console.log("set current route", action.payload )
      state.currentRoute = action.payload
    },
  },
})

export const { setCurrentRoute } = navigationSlice.actions
export default navigationSlice.reducer
