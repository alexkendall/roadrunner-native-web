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
import { useEffect, useState } from "react";
import { ScreenNavigationRoutes } from "./src/Config/PageRoutes";
import {
  updateWindowState,
} from "./src/Redux/Slices/WindowSlice"
import { useDimensions } from "react-native-web-hooks";
import Theme from "./src/Config/Theme";
import { useFonts } from 'expo-font';
import { RRFonts } from "./src/Config/Fonts";
import { navigationRef } from './src/Navigation'
import { ActivityIndicator, View } from 'react-native'
const Stack = createNativeStackNavigator();
const FONT_LOAD_DELAY_MS = 240

export default () => {

  const dimensions = useDimensions().window
  const [fontDelay, setfontDelay] = useState(true)

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
    "Menlo": require('./assets/Fonts/Menlo-Regular.ttf'),
    "Graphik": require('./assets/Fonts/Graphik-MediumItalic.otf'),
    "RobotoBlack": require('./assets/Fonts/Roboto/Roboto-Black.ttf'),
    "RobotoMediumIttalic": require('./assets/Fonts/Roboto/Roboto-MediumItalic.ttf'),
    "RobotoBoldIttalic": require('./assets/Fonts/Roboto/Roboto-BoldItalic.ttf'),
    "RobotoMedium": require('./assets/Fonts/Roboto/Roboto-Medium.ttf'),
    "RobotoThin": require('./assets/Fonts/Roboto/Roboto-Thin.ttf'),
    "MenionPro": require('./assets/Fonts/MinionPro-Regular.otf')
  })

  if (fontsLoaded) {
    setTimeout(() => {
      setfontDelay(false)
    }, FONT_LOAD_DELAY_MS);
  }

  if (fontDelay) {
    return (
      <View style={{ flex: 1, backgroundColor: Theme.primary, alignItems: "center", justifyContent: "center" }} >
        <ActivityIndicator size={"large"} color={Theme.primary_light} />
      </View>
    )
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
