import { Provider } from 'react-redux'
import store from '../src/Redux/Store'
import { NavigationContainer } from '@react-navigation/native'
import Home from '../src/Pages/Home'
import Cases from '../src/Pages/Cases'
import Contact from '../src/Pages/Contact'
import About from '../src/Pages/About'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { dispatch } from '../src/Redux/Store'
import { useEffect, useState } from 'react'
import { ScreenNavigationRoutes } from '../src/Config/PageRoutes'
import { updateWindowState } from '../src/Redux/Slices/WindowSlice'
import { useDimensions } from 'react-native-web-hooks'
import Theme from '../src/Config/Theme'
import { useFonts } from 'expo-font'
import { RRFonts } from '../src/Config/Fonts'
import { navigationRef } from '../src/Navigation'
import { ActivityIndicator, View, Text } from 'react-native'
import { BackButton } from '../src/Components/Common/BackButton'
import '../src/Styling/ionicons.css'
import { Content } from '../src/Pages/Content'
import { Photography } from '../src/Pages/Photography'
import { MentalHealth } from '../src/Pages/MentalHealthContent'
import { initializeAuth } from '../src/Config/Firebase'
const Stack = createNativeStackNavigator()
const FONT_LOAD_DELAY_MS = 240

export default () => {
  const dimensions = useDimensions().window
  const [fontDelay, setfontDelay] = useState(true)

  useEffect(() => {
    dispatch(updateWindowState({
      window_height: dimensions.height,
      window_width: dimensions.width,
      height: dimensions.height,
      width: dimensions.width
    }))
  }, [dimensions])

  const navigationOptions = {
    headerTintColor: Theme.primary,
    headerTitleStyle: {
      fontFamily: RRFonts.RobotoMediumIttalic,
      color: Theme.primary,
    },
    headerStyle: {
      backgroundColor: Theme.white,
      borderBottomWidth: 1,
      borderBottomColor: Theme.primary,
    },
    headerRight: () => (
      <Text style={{ fontSize: 20, marginRight: 20, fontWeight: '600', color: Theme.blue }}>
        {' '}
      </Text>
    ),
    headerLeft: () => <BackButton />,
  }

  const fontsLoaded = useFonts({
    Menlo: require('../assets/FontFiles/Menlo-Regular.ttf'),
    Graphik: require('../assets/FontFiles/Graphik-MediumItalic.otf'),
    RobotoBlack: require('../assets/FontFiles/Roboto/Roboto-Black.ttf'),
    RobotoMediumIttalic: require('../assets/FontFiles/Roboto/Roboto-MediumItalic.ttf'),
    RobotoBoldIttalic: require('../assets/FontFiles/Roboto/Roboto-BoldItalic.ttf'),
    RobotoMedium: require('../assets/FontFiles/Roboto/Roboto-Medium.ttf'),
    RobotoThin: require('../assets/FontFiles/Roboto/Roboto-Thin.ttf'),
    MenionPro: require('../assets/FontFiles/MinionPro-Regular.otf'),
    Ionicons: require('../assets/FontFiles/ionicons.ttf'),
  })

  // Initialize Firebase anonymous authentication
  useEffect(() => {
    initializeAuth().catch((error) => {
      console.error('Failed to initialize Firebase authentication:', error)
    })
  }, [])

  // Ensure Ionicons font is available on web (especially iOS Safari)
  // The CSS import handles the @font-face, but we add this as a fallback
  useEffect(() => {
    if (typeof document !== 'undefined' && fontsLoaded) {
      // Force font loading by creating a test element
      // This helps iOS Safari recognize the font
      const testElement = document.createElement('span')
      testElement.style.fontFamily = 'Ionicons'
      testElement.style.position = 'absolute'
      testElement.style.visibility = 'hidden'
      testElement.style.fontSize = '1px'
      testElement.textContent = '\uF101' // Common Ionicons character
      document.body.appendChild(testElement)

      // Clean up after a short delay
      setTimeout(() => {
        if (testElement.parentNode) {
          testElement.parentNode.removeChild(testElement)
        }
      }, 100)
    }
  }, [fontsLoaded])

  if (fontsLoaded) {
    setTimeout(() => {
      setfontDelay(false)
    }, FONT_LOAD_DELAY_MS)
  }

  if (fontDelay) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Theme.primary,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator size={'large'} color={Theme.primary_light} />
      </View>
    )
  }

  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{ ...navigationOptions }}>
          <Stack.Screen name={ScreenNavigationRoutes.HOME} component={Home} />
          <Stack.Screen name={ScreenNavigationRoutes.CASES} component={Cases} />
          <Stack.Screen name={ScreenNavigationRoutes.ABOUT} component={About} />
          <Stack.Screen name={ScreenNavigationRoutes.CONTACT} component={Contact} />
          <Stack.Screen name={ScreenNavigationRoutes.CONTENT} component={Content} />
          <Stack.Screen name={ScreenNavigationRoutes.PHOTOGRAPHY} component={Photography} />
          <Stack.Screen
            name={ScreenNavigationRoutes.MENTAL_HEALTH_CONTENT}
            component={MentalHealth}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
