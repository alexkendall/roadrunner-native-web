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

return (
  <ScrollView>
      {flagsLoading ? (
        <Text
          style={{
            color: Theme.white,
            backgroundColor: Theme.primary,
            padding: 16,
            fontFamily: RRFonts.RobotoBoldIttalic,
          }}
        >
          Loading…
        </Text>
      ) : null}

      {isEnabled('about') ? renderOption('ABOUT', Theme.white, Theme.primary, 'about', ScreenNavigationRoutes.ABOUT) : null}
      {isEnabled('mental_health')
        ? renderOption(
            'MENTAL HEALTH',
            Theme.black,
            Theme.white,
            'mental-health',
            ScreenNavigationRoutes.MENTAL_HEALTH_CONTENT
          )
        : null}
      {isEnabled('software') ? renderOption('SOFTWARE', Theme.white, Theme.black, 'cases', ScreenNavigationRoutes.CASES) : null}
      {isEnabled('photography')
        ? renderOption('PHOTOGRAPHY', Theme.black, Theme.white, 'photography', ScreenNavigationRoutes.PHOTOGRAPHY)
        : null}
      {isEnabled('content') ? renderOption('CONTENT', Theme.white, Theme.black, 'content', ScreenNavigationRoutes.CONTENT) : null}
      {isEnabled('sports_training')
        ? renderOption('SPORTS TRAINING', Theme.black, Theme.white, 'sports-training', ScreenNavigationRoutes.SPORTS_TRAINING)
        : null}
      {isEnabled('contact') ? renderOption('CONTACT', Theme.white, Theme.black, 'contact', ScreenNavigationRoutes.CONTACT) : null}
      </ScrollView>
  )
}

export default withFooter(connect(mapStateToProps)(Home) as any)
