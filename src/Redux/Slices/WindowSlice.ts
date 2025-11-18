import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TAB_BREAKPOINT } from '../../Config/Device'

export const MOBILE_TAB_HEIGHT = 49
export const WEB_TAB_HEIGHT = 75
export const FOOTER_HEIGHT = 50

export interface WindowState {
  WEB_TAB_HEIGHT: number
  MOBILE_TAB_HEIGHT: number
  FOOTER_HEIGHT: number
  window_width: number
  window_height: number
  content_height: number
  content_width: number
  footer_height: number
  tab_height: number
  doRenderTabs: boolean
  isMobile: boolean
  menu_visible: boolean
  paddingRight: number
  paddingTop: number
}

const initialState: WindowState = {
  WEB_TAB_HEIGHT: 0,
  MOBILE_TAB_HEIGHT: 0,
  FOOTER_HEIGHT: 0,
  window_width: window.innerWidth ?? 0,
  window_height: window.innerHeight ?? 0,
  content_height: window.window_height - FOOTER_HEIGHT ?? 0,
  content_width: window.window_width ?? 0,
  footer_height: FOOTER_HEIGHT ?? 0,
  tab_height: WEB_TAB_HEIGHT ?? 0,
  doRenderTabs: false,
  isMobile: true,
  menu_visible: false,
  paddingRight: 0,
  paddingTop: 200,
}

export interface WinDimensionState {
  height: number
  width: number
  window_height: number
  window_width: number
}

function computeWindowState(state: WinDimensionState) {
  const window_width: number = state.width
  const window_height: number = state.height
  const footer_height: number = FOOTER_HEIGHT
  const content_height: number = window_height - footer_height
  const content_width: number = window_width
  const doRenderTabs: boolean = content_width > TAB_BREAKPOINT && window_height > TAB_BREAKPOINT
  const isMobile = !doRenderTabs
  const tab_height: number = !isMobile ? WEB_TAB_HEIGHT : MOBILE_TAB_HEIGHT
  const paddingRight: number = isMobile ? 0.0 : 0.0
  const paddingTop: number = isMobile ? MOBILE_TAB_HEIGHT + 40.0 : WEB_TAB_HEIGHT + 40.0
  return {
    WEB_TAB_HEIGHT,
    MOBILE_TAB_HEIGHT,
    FOOTER_HEIGHT,
    paddingRight,
    paddingTop,
    doRenderTabs: doRenderTabs,
    window_width,
    window_height,
    isMobile,
    content_height,
    content_width,
    footer_height,
    tab_height,
  }
}

const windowsSlice = createSlice({
  name: 'windowSlice',
  initialState,
  reducers: {
    updateWindowState(state, action: PayloadAction<WinDimensionState>) {
      const result = computeWindowState(action.payload)
      state.WEB_TAB_HEIGHT = result.WEB_TAB_HEIGHT
      state.MOBILE_TAB_HEIGHT = result.MOBILE_TAB_HEIGHT
      state.FOOTER_HEIGHT = result.FOOTER_HEIGHT
      state.paddingRight = result.paddingRight
      state.paddingTop = result.paddingTop
      state.doRenderTabs = result.doRenderTabs
      state.window_height = result.window_height
      state.window_width = result.window_width
      state.isMobile = result.isMobile
      state.content_height = result.content_height
      state.content_width = result.content_width
      state.footer_height = result.footer_height
      state.tab_height = result.tab_height
    },
    setMenuVisibility(state, action: PayloadAction<boolean>) {
      state.menu_visible = action.payload
    },
  },
})

export const { updateWindowState, setMenuVisibility } = windowsSlice.actions
export default windowsSlice.reducer
