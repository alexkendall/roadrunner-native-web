import { useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Animated, Platform } from 'react-native'
import Theme from '../../../Config/Theme'

interface LoadingIndicatorProps {
  message?: string
  showBoltIcon?: boolean
}

const HALF_CIRCLE_ICON_URL = 'https://firebasestorage.googleapis.com/v0/b/roadrunner-native-web.appspot.com/o/Navigation%2Froadrunner_loading.png?alt=media&token=af218997-10b7-4e38-af4e-b4e6e5b9c5e2'

export const LoadingIndicator = ({ message, showBoltIcon = true }: LoadingIndicatorProps) => {
  const opacity = useRef(new Animated.Value(0.3)).current
  const useNativeDriver = Platform.OS !== 'web'

  useEffect(() => {
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 1000,
          useNativeDriver,
        }),
      ])
    )

    pulseAnimation.start()

    return () => {
      pulseAnimation.stop()
    }
  }, [opacity])

  return (
    <View style={styles.container}>
      {showBoltIcon && (
        <Animated.Image
          source={{ uri: HALF_CIRCLE_ICON_URL }}
          style={[styles.boltIcon, { opacity }]}
          resizeMode="contain"
        />
      )}
      {message && (
        <Text style={styles.message}>{message}</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  boltIcon: {
    width: 60,
    height: 60,
    marginBottom: 20,
  },
  spinner: {
    marginTop: 10,
  },
  message: {
    marginTop: 10,
    color: Theme.primary,
    fontSize: 16,
  },
})

