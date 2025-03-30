import { createSlice, PayloadAction } from '@reduxjs/toolkit'

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
      state.currentRoute = action.payload
    },
  },
})

export const { setCurrentRoute } = navigationSlice.actions
export default navigationSlice.reducer
