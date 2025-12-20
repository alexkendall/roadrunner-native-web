import { useCallback, useEffect, useMemo, useState } from 'react'
import { connect } from 'react-redux'
import Theme from '../Config/Theme'
import { RootState } from '../Redux/Store'
import { Text, ScrollView, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { ScreenNavigationRoutes } from '../Config/PageRoutes'
import { RRFonts } from '../Config/Fonts'
import withFooter from '../Hoc/withFooter'
import type { NavigationProp, RootStackParamList } from '../Navigation'
import { fetchFeatureFlags } from '../Services/FeatureFlagsService'

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

  const navigation = useNavigation<NavigationProp>()

  const [flagsLoading, setFlagsLoading] = useState(true)
  const [flagsError, setFlagsError] = useState<Error | null>(null)
  const [flags, setFlags] = useState<Record<string, boolean> | null>(null)

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      try {
        const result = await fetchFeatureFlags()
        if (cancelled) return
        setFlags(result?.flags ?? null)
        setFlagsError(null)
      } catch (e) {
        if (cancelled) return
        setFlags(null)
        setFlagsError(e instanceof Error ? e : new Error('Failed to load feature flags'))
      } finally {
        if (cancelled) return
        setFlagsLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])

  const isEnabled = useMemo(() => {
    // If flags fail to load, keep current behavior (show all).
    if (flagsError) {
      return (_key: string) => true
    }
    return (key: string) => (flags ? flags[key] !== false : true)
  }, [flags, flagsError])

  const renderOptionWeb = useCallback(
    (text: string, color: string, backgroundColor: string, link: string, route: keyof RootStackParamList) => {
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
    (text: string, color: string, backgroundColor: string, link: string, route: keyof RootStackParamList) => {
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

  const options = [
    {
      label: 'ABOUT',
      value: 'about',
      route: ScreenNavigationRoutes.ABOUT,
      color: Theme.white,
      backgroundColor: Theme.primary,
    },
    {
      label: 'MENTAL HEALTH',
      value: 'mental_health',
      route: ScreenNavigationRoutes.MENTAL_HEALTH_CONTENT,
      color: Theme.black,
      backgroundColor: Theme.white,
    },
    {
      label: 'SOFTWARE',
      value: 'software',
      route: ScreenNavigationRoutes.CASES,
      color: Theme.white,
      backgroundColor: Theme.black,
    },
    {
      label: 'PHOTOGRAPHY',
      value: 'photography',
      route: ScreenNavigationRoutes.PHOTOGRAPHY,
      color: Theme.black,
      backgroundColor: Theme.white,
    },
    {
      label: 'CONTENT',
      value: 'content',
      route: ScreenNavigationRoutes.CONTENT,
      color: Theme.white,
      backgroundColor: Theme.black,
    },
    {
      label: 'SPORTS TRAINING',
      value: 'sports_training',
      route: ScreenNavigationRoutes.SPORTS_TRAINING,
    },
    {
      label: 'CONTACT',
      value: 'contact',
      route: ScreenNavigationRoutes.CONTACT,
      color: Theme.white,
      backgroundColor: Theme.black,
    },
  ]

  const filteredOptions = options.filter((option) => isEnabled(option.value))


  return (
    <ScrollView>
        {filteredOptions.map((option, index) => {
          const backgroundColor = index % 2 === 0 ? "black" : Theme.white
          const color = index % 2 === 0 ? Theme.white : Theme.black
          return (
            <TouchableOpacity key={option.value} onPress={() => {
              navigation.navigate(option.route)
            }}>
              {isEnabled(option.value) ? renderOption(option.label, backgroundColor, color, option.route, ScreenNavigationRoutes.ABOUT) : null}
            </TouchableOpacity>
          )
        })}
      </ScrollView>
    )
}

export default withFooter(connect(mapStateToProps)(Home) as any)
