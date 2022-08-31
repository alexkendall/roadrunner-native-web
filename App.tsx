import App from "./src/Components/App";
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
import {
  updateWindowState,
} from "./src/Redux/Slices/WindowSlice"
import { useDimensions } from "react-native-web-hooks";
const Stack = createNativeStackNavigator();

export default () => {

  const dimensions = useDimensions().window

  useEffect(() => {
    dispatch(fetchPosts())
  }, [])


  useEffect(() => {
    dispatch(updateWindowState({ height: dimensions.height, width: dimensions.width }))
  }, [dimensions])

  return (
    <Provider store={store} >
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name={ScreenNavigationRoutes.HOME} component={Home} />
          <Stack.Screen name={ScreenNavigationRoutes.CASES} component={Cases} />
          <Stack.Screen name={ScreenNavigationRoutes.SOLUTIONS} component={Solutions} />
          <Stack.Screen name={ScreenNavigationRoutes.CONTACT} component={Contact} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  )
}
