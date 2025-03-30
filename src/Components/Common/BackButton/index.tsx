import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import { useNavigation } from 'expo-router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentRoute } from '../../../Redux/Slices/NavigationSlice'
import { navigationSelector } from '../../../Redux/Selectors/navigationSelector'

export const BackButton = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch()
  const currentRoute = useSelector(navigationSelector)

  useEffect(() => {
    window.addEventListener('hashchange', function () {
      console.log('location changed!');
    });
  }, [])

  const canGoBack = currentRoute !== "home" && currentRoute !== ""
  console.log("current route", currentRoute)


  if (!canGoBack) {
    return (
      <Image
        resizeMode="contain"
        style={{ width: 80, height: 80, marginLeft: 10 }}
        source={{
          uri: 'https://firebasestorage.googleapis.com/v0/b/roadrunner-native-web.appspot.com/o/Navigation%2FRRH2.png?alt=media&token=f90338bc-7500-417e-9ed2-12e0441b2af3',
        }}
      />
    )
  }

  return (
    <TouchableOpacity onPress={() => {
      navigation.navigate("home")
      dispatch(setCurrentRoute("home"))

    }}>
      <Image
        style={{ height: 20, width: 20, marginLeft: 10 }}
        source={require('../../../../assets/Branding/chevron_back.png')}
      />
    </TouchableOpacity>
  )
}
