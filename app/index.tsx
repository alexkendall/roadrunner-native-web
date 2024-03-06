import { Provider } from "react-redux";
import store from "../src/Redux/Store";
import { NavigationContainer } from "@react-navigation/native";
import Home from "../src/Pages/Home";
import Cases from "../src/Pages/Cases";
import Solutions from "../src/Pages/Solutions";
import Contact from "../src/Pages/Contact";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { dispatch } from "../src/Redux/Store";
import { useEffect, useState } from "react";
import { ScreenNavigationRoutes } from "../src/Config/PageRoutes";
import { updateWindowState } from "../src/Redux/Slices/WindowSlice";
import { useDimensions } from "react-native-web-hooks";
import Theme from "../src/Config/Theme";
import { useFonts } from "expo-font";
import { RRFonts } from "../src/Config/Fonts";
import { navigationRef } from "../src/Navigation";
import { ActivityIndicator, View, Image } from "react-native";
import { BackButton } from "../src/Components/Common/BackButton";
const Stack = createNativeStackNavigator();
const FONT_LOAD_DELAY_MS = 240;

export default () => {
  const dimensions = useDimensions().window;
  const [fontDelay, setfontDelay] = useState(true);

  useEffect(() => {
    dispatch(
      updateWindowState({ height: dimensions.height, width: dimensions.width })
    );
  }, [dimensions]);

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
      <Image
        resizeMode={"contain"}
        style={{ height: 50, width: 50, marginRight: 20 }}
        source={require("../assets/Branding/RR_GREEN.png")}
      />
    ),
    headerLeft: () => {
      return <BackButton />;
    },
  };

  const fontsLoaded = useFonts({
    Menlo: require("../assets/FontFiles/Menlo-Regular.ttf"),
    Graphik: require("../assets/FontFiles/Graphik-MediumItalic.otf"),
    RobotoBlack: require("../assets/FontFiles/Roboto/Roboto-Black.ttf"),
    RobotoMediumIttalic: require("../assets/FontFiles/Roboto/Roboto-MediumItalic.ttf"),
    RobotoBoldIttalic: require("../assets/FontFiles/Roboto/Roboto-BoldItalic.ttf"),
    RobotoMedium: require("../assets/FontFiles/Roboto/Roboto-Medium.ttf"),
    RobotoThin: require("../assets/FontFiles/Roboto/Roboto-Thin.ttf"),
    MenionPro: require("../assets/FontFiles/MinionPro-Regular.otf"),
    Ionicons: require("../assets/FontFiles/ionicons.ttf"),
  });

  if (fontsLoaded) {
    setTimeout(() => {
      setfontDelay(false);
    }, FONT_LOAD_DELAY_MS);
  }

  if (fontDelay) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: Theme.primary,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size={"large"} color={Theme.primary_light} />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen
            options={navigationOptions}
            name={ScreenNavigationRoutes.HOME}
            component={Home}
          />
          <Stack.Screen
            options={navigationOptions}
            name={ScreenNavigationRoutes.CASES}
            component={Cases}
          />
          <Stack.Screen
            options={navigationOptions}
            name={ScreenNavigationRoutes.SOLUTIONS}
            component={Solutions}
          />
          <Stack.Screen
            options={navigationOptions}
            name={ScreenNavigationRoutes.CONTACT}
            component={Contact}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
