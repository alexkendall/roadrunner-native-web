import { createNavigationContainerRef } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export const navigationRef = createNavigationContainerRef()

export function navigate(name: string, params?: any) {
  if (navigationRef.isReady()) {
    ;(navigationRef as any).navigate(name, params)
  }
}


type RootStackParamList = {
  'Roadrunner Creative': undefined
  'Software': undefined
  'About': undefined
  'Contact': undefined
  'Content': undefined
  'Photography': undefined
  'Mental Health Content': undefined
}

export type NavigationProp = NativeStackNavigationProp<RootStackParamList>
