import { useEffect, useState } from 'react'
import { navigationRef } from '../Navigation'

const NAV_READY_RETRY_DELAY_MS = 50

export const useCanGoBack = () => {
  const [canGoBack, setCanGoBack] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setInterval(() => {
        setIsReady(navigationRef.isReady())
    }, NAV_READY_RETRY_DELAY_MS);
  }, [])

  useEffect(() => { 
    if (!isReady) {
        setIsLoading(true)
        setCanGoBack(false)
        return
    }
    setIsLoading(false)
    const currentRouteName = navigationRef.getCurrentRoute()?.name
    if(currentRouteName && currentRouteName.length > 0 && currentRouteName !== 'Roadrunner Creative') {
        setCanGoBack(true)
        return
    }
    setCanGoBack(false)
  }, [isReady])

  return {
    canGoBack,
    isLoading,
    isReady,
  }
}
