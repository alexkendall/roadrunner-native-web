import { useCallback } from 'react'
import { connect } from 'react-redux'
import Theme from '../Config/Theme'
import { RootState } from '../Redux/Store'
import { View, Image, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ScreenNavigationRoutes } from '../Config/PageRoutes'
import { RRFonts } from '../Config/Fonts'
import withFooter from '../Hoc/withFooter'

const mapStateToProps = (state: RootState) => {
  const props = {
    content_height: state.window.content_height ?? 0,
    content_width: state.window.content_width ?? 0,
    paddingTop: state.window.paddingTop,
    homepage_data: state.wordpress.homepage_data,
    isMobile: state.window.isMobile,
    footer_height: state.window.footer_height,
  }
  return props
}

interface Props {
  content_height: number
  content_width: number
  footer_height: number
  homepage_data: Record<string, any>
  isMobile: boolean
}

const Home = ({ isMobile }: Props) => {

  const navigation = useNavigation()

  const renderOptionWeb = useCallback(
    (text: string, color: string, backgroundColor: string, link: string, route: string) => {
      const paddingHorizontal: number = isMobile ? 50.0 : 100.0
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(route)
          }}
          style={{
            padding: paddingHorizontal,
            backgroundColor,
            borderRightWidth: 0,
            borderLeftWidth: 0,
            borderColor: Theme.primary,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text
            style={{
              color,
              fontSize: 50,
              fontFamily: RRFonts.RobotoBoldIttalic,
            }}
          >
            {text}
          </Text>
        </TouchableOpacity>
      )
    },
    [isMobile]
  )

  const renderOptionMobile = useCallback(
    (text: string, color: string, backgroundColor: string, link: string, route: string) => {
      const paddingHorizontal: number = isMobile ? 50.0 : 100.0
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(route)
          }}
          style={{
            width: '100%',
            padding: paddingHorizontal,
            backgroundColor,
            borderRightWidth: 0,
            borderLeftWidth: 0,
            borderColor: Theme.primary,
          }}
        >
          <Text
            style={{
              color,
              fontSize: 20,
              fontFamily: RRFonts.RobotoBoldIttalic,
            }}
          >
            {text}
          </Text>
        </TouchableOpacity>
      )
    },
    [isMobile]
  )

  // SplitView content for Top Options
  const renderOption = isMobile ? renderOptionMobile : renderOptionWeb
  const renderAboutComponent = () =>
    renderOption('ABOUT', Theme.white, Theme.primary, 'about', ScreenNavigationRoutes.ABOUT)
  const renderClientsComponent = () =>
    renderOption('SOFTWARE', Theme.white, Theme.black, 'cases', ScreenNavigationRoutes.CASES)
  const renderMentalHealthComponent = () =>
    renderOption('MENTAL HEALTH', Theme.black, Theme.white, 'mental-health', ScreenNavigationRoutes.MENTAL_HEALTH_CONTENT)
  const renderPhotographyComponent = () =>
    renderOption('PHOTOGRAPHY', Theme.black, Theme.white, 'photography', ScreenNavigationRoutes.PHOTOGRAPHY)
  const renderContentComponent = () =>
    renderOption('CONTENT', Theme.white, Theme.black, 'content', ScreenNavigationRoutes.CONTENT)
  const renderContactComponent = () =>
    renderOption('CONTACT', Theme.black, Theme.white, 'contact', ScreenNavigationRoutes.CONTACT)


  const renderTopOptions = () => (
    <View>
      {renderAboutComponent()}
      {renderMentalHealthComponent()}
      {renderClientsComponent()}
      {renderPhotographyComponent()}
      {renderContentComponent()}
      {renderContactComponent()}
    </View>
  )

  const uri = isMobile
    ? 'https://firebasestorage.googleapis.com/v0/b/roadrunner-native-web.appspot.com/o/Home-Banner%2Fbanner-mobile.jpeg?alt=media&token=a02a83d4-9ca4-4510-ac13-b5fb10e86be7'
    : 'https://firebasestorage.googleapis.com/v0/b/roadrunner-native-web.appspot.com/o/Home-Banner%2Fbanner-web.jpeg?alt=media&token=85e9b668-5b6c-44a6-98bb-33337a53423f'
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Theme.primary }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ height: '100%', width: '100%', paddingBottom: 50 }}
      >
        <Image style={{ width: '100%', height: 450 }} source={{ uri }} />
        <View style={{ display: 'flex', flexDirection: 'column' }}>{renderTopOptions()}</View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default withFooter(connect(mapStateToProps)(Home))
