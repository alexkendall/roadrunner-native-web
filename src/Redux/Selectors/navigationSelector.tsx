import { RootState } from '../Store'

export const navigationSelector = (state: RootState) => state.navigation.currentRoute
