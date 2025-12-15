import { createNavigationContainerRef } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export const navigationRef = createNavigationContainerRef()

export function navigate(name: string, params?: any) {
  if (navigationRef.isReady()) {
    ;(navigationRef as any).navigate(name, params)
  }
}

export function isNavigationReady() {
  return navigationRef.isReady()
}

export function canGoBack() {
  return navigationRef.isReady() ? navigationRef.canGoBack() : false
}

export function goBack() {
  if (!navigationRef.isReady()) return
  if (!navigationRef.canGoBack()) return
  navigationRef.goBack()
}


type RootStackParamList = {
  'Roadrunner Creative': undefined
  'Software': undefined
  'About': undefined
  'Contact': undefined
  'Content': undefined
  'Photography': undefined
  'Mental Health': undefined
}

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>
