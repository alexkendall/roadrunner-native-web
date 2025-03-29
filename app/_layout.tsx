import { Provider } from 'react-redux'
import store from '../src/Redux/Store'
import { dispatch } from '../src/Redux/Store'
import { useEffect, useState } from 'react'
import { updateWindowState } from '../src/Redux/Slices/WindowSlice'
import { useDimensions } from 'react-native-web-hooks'
import Theme from '../src/Config/Theme'
import { useFonts } from 'expo-font'
import { RRFonts } from '../src/Config/Fonts'
import { ActivityIndicator, View, Text } from 'react-native'
import { BackButton } from '../src/Components/Common/BackButton'
import { Stack } from 'expo-router';

const FONT_LOAD_DELAY_MS = 240

export default () => {
  const dimensions = useDimensions().window
  const [fontDelay, setfontDelay] = useState(true)

  useEffect(() => {
    dispatch(updateWindowState({ height: dimensions.height, width: dimensions.width }))
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
        {'Alex Harrison'}
      </Text>
    ),
    headerLeft: () => <BackButton canGoBack={true} />,
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
        <Stack screenOptions={{ ...navigationOptions }}>
        <Stack.Screen name={"index"} options={{title: "Home"}}/>
        <Stack.Screen name={"home"} options={{title: "Home"}}/>
        <Stack.Screen name={"clients"} options={{title: "Clients"}}/>
        <Stack.Screen name={"about"} options={{title: "About"}}/>
        </Stack>
    </Provider>
  )
}
