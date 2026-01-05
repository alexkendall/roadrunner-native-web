import { createNavigationContainerRef } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { ScreenNavigationRoutes } from '../Config/PageRoutes'

export const navigationRef = createNavigationContainerRef<RootStackParamList>()

export const navigate = (name: string, params?: any) => {
  if (navigationRef.isReady()) {
    ;(navigationRef as any).navigate(name, params)
  }
}

export const isNavigationReady = () => {
  return navigationRef.isReady()
}

export const canGoBack = () => {
  while(!navigationRef.isReady()) {
    console.log('navigationRef.isReady()', navigationRef.isReady())
    setTimeout(() => {
      return canGoBack()
    }, 50)
  }
  console.log('navigationRef.isReady()', navigationRef.isReady())
  const currentRouteName = navigationRef.getCurrentRoute()?.name
  return currentRouteName ? true : false
}

export const goBack = async () => {
  if(canGoBack()) {
    navigationRef.navigate(ScreenNavigationRoutes.HOME)
      return
  }
  return
}


export type RootStackParamList = {
  'Roadrunner Creative': undefined
  'Software': undefined
  'About': undefined
  'Contact': undefined
  'Content': undefined
  'Photography': undefined
  'Mental Health': undefined
  'Education': undefined
  'Sports Training': undefined
}

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>
