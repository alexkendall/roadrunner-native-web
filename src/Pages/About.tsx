import { useCallback } from 'react'
import { connect } from 'react-redux'
import Theme from '../Config/Theme'
import { RootState } from '../Redux/Store'
import { WordpressPost } from '../Redux/Slices/WordpressSlice'
import { View, Text, ScrollView, Platform, StyleSheet, TouchableOpacity } from 'react-native'
import { RRFonts } from '../Config/Fonts'
import withFooter from '../Hoc/withFooter'
import { FOOTER_HEIGHT } from '../Redux/Slices/WindowSlice'
import SolutionsData from '../Data/Solutions'
import { ScreenNavigationRoutes } from '../Config/PageRoutes'
import { navigate } from '../Navigation'


const mapStateToProps = (state: RootState) => {
  return {
    solutions_data: Object.values(SolutionsData),
    width: state.window.content_width,
    tab_height: state.window.tab_height,
    paddingRight: state.window.paddingRight,
    paddingTop: state.window.paddingTop,
    isMobile: state.window.isMobile,
    content_width: state.window.content_width,
  }
}

interface Props {
  solutions_data?: Array<Record<string, any>>
  posts?: Array<WordpressPost>
  tab_height?: number
  paddingRight?: number
  paddingTop?: number
  isMobile?: boolean
  content_width: number
}

const About = ({ isMobile, content_width }: Props) => {

  const renderFocus = useCallback(() => {
    return (
      <View style={{ padding: 40, zIndex: 1 }}>
        <View
          style={{
            width: content_width,
            marginLeft: '5%',
            height: 3,
            backgroundColor: Theme.white,
          }}
        />
        <Text
          style={{
            color: Theme.primary,
            paddingHorizontal: 30,
            width: content_width,
            textAlign: 'center',
            fontSize: 18,
            paddingTop: 20,
            fontFamily: RRFonts.Menlo,
          }}
        ></Text>
      </View>
    )
  }, [content_width])

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Theme.white }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          paddingTop: 30,
          paddingBottom: Platform.OS === 'web' ? FOOTER_HEIGHT : 0,
          justifyContent: 'center',
          backgroundColor: Theme.primary_light,
          flex: 1,
          paddingHorizontal: 40,
          alignItems: 'center',
        }}
      >
        <Text
          style={{
            color: Theme.blue,
            fontSize: isMobile ? 54 : 70,
            textAlign: 'center',
            marginBottom: 10,
            fontFamily: RRFonts.RobotoBoldIttalic,
          }}
        >
          WHAT WE DO
        </Text>
        <TouchableOpacity onPress={() => {
          navigate(ScreenNavigationRoutes.CASES)
        }}>
          <Text style={styles.header2} >
            MENTAL HEALTH
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          navigate(ScreenNavigationRoutes.CASES)
        }}>
          <Text style={styles.header2} >
            SOFTWARE
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          navigate(ScreenNavigationRoutes.CONTENT)
        }}>
          <Text style={styles.header2}>
            CONTENT
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          navigate(ScreenNavigationRoutes.PHOTOGRAPHY)
        }}>
          <Text style={styles.header2}>
            PHOTOGRAPHY
          </Text>
        </TouchableOpacity>
        {/*
        <TouchableOpacity onPress={() => {
          navigate(ScreenNavigationRoutes.EDUCATION)
        }}>
          <Text style={styles.header2}>
            EDUCATION
          </Text>
        </TouchableOpacity>
        */}
        <TouchableOpacity onPress={() => {
          navigate(ScreenNavigationRoutes.SPORTS_TRAINING)
        }}>
          <Text style={styles.header2}>
            SPORTS TRAINING
          </Text>
        </TouchableOpacity>
        {renderFocus()}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  header1: {
    fontSize: 40,
    textAlign: 'left',
    marginTop: 30,
    color: Theme.blue,
    marginBottom: 20,
    fontFamily: RRFonts.RobotoMediumIttalic,
    fontWeight: '100',
  },
  header2: {
    fontSize: 30,
    textAlign: 'left',
    marginTop: 5,
    color: Theme.blue,
    fontFamily: RRFonts.RobotoMediumIttalic,
    fontWeight: '100',

  },
  body: {
    fontSize: 20,
    textAlign: 'left',
    marginTop: 5,
    color: Theme.blue,
  },
})

export default withFooter(connect(mapStateToProps)(About))
