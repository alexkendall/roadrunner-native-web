import { Provider } from "react-redux";
import store from "./src/Redux/Store";
import { NavigationContainer } from '@react-navigation/native';
import Home from './src/Pages/Home'
import Cases from "./src/Pages/Cases";
import Solutions from "./src/Pages/Solutions";
import Contact from "./src/Pages/Contact";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { dispatch } from "./src/Redux/Store";
import { fetchPosts } from "./src/Redux/Thunks/WordpressThunk";
import { useEffect } from "react";
import { ScreenNavigationRoutes } from "./src/Config/PageRoutes";
import * as Font from 'expo-font';
import {
  updateWindowState,
} from "./src/Redux/Slices/WindowSlice"
import { useDimensions } from "react-native-web-hooks";
import Theme from "./src/Config/Theme";
import { useFonts } from 'expo-font';
import { RRFonts } from "./src/Config/Fonts";
import { navigate, navigationRef } from './src/Navigation'
const Stack = createNativeStackNavigator();

export default () => {

  const dimensions = useDimensions().window

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])


  useEffect(() => {
    dispatch(updateWindowState({ height: dimensions.height, width: dimensions.width }))
  }, [dimensions])

  const navigationOptions = {
    headerTintColor: Theme.primary,
     headerTitleStyle: {
      fontFamily: RRFonts.RobotoMediumIttalic
    },
    headerStyle: {
      backgroundColor: Theme.light_green,
      borderBottomWidth: 1,
      borderBottomColor: Theme.primary
    },
  }

  const fontsLoaded = useFonts({
    "Menlo": require('./assets/fonts/Menlo-Regular.ttf'),
    "Graphik": require('./assets/fonts/Graphik-MediumItalic.otf'),
    "RobotoBlack": require('./assets/fonts/Roboto/Roboto-Black.ttf'),
    "RobotoMediumIttalic": require('./assets/fonts/Roboto/Roboto-MediumItalic.ttf'),
    "RobotoBoldIttalic": require('./assets/fonts/Roboto/Roboto-BoldItalic.ttf'),
    "RobotoMedium": require('./assets/fonts/Roboto/Roboto-Medium.ttf'),
    "RobotoThin": require('./assets/fonts/Roboto/Roboto-Thin.ttf'),
    "MenionPro": require('./assets/fonts/MinionPro-Regular.otf')
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <Provider store={store} >
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen options={navigationOptions} name={ScreenNavigationRoutes.HOME} component={Home} />
          <Stack.Screen options={navigationOptions} name={ScreenNavigationRoutes.CASES} component={Cases} />
          <Stack.Screen options={navigationOptions} name={ScreenNavigationRoutes.SOLUTIONS} component={Solutions} />
          <Stack.Screen options={navigationOptions} name={ScreenNavigationRoutes.CONTACT} component={Contact} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
