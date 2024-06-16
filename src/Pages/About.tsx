import { useCallback } from 'react'
import { connect } from 'react-redux'
import Theme from '../Config/Theme'
import { RootState } from '../Redux/Store'
import { WordpressPost } from '../Redux/Slices/WordpressSlice'
import { View, Text, ScrollView, Platform, StyleSheet } from 'react-native'
import { RRFonts } from '../Config/Fonts'
import withFooter from '../Hoc/withFooter'
import { FOOTER_HEIGHT } from '../Redux/Slices/WindowSlice'
import SolutionsData from '../Data/Solutions'

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

const Solutions = ({ isMobile, content_width }: Props) => {
  const renderTopHeader = useCallback(() => {
    return (
      <Text
        style={{
          fontSize: isMobile ? 20 : 60,
          color: Theme.blue,
          fontFamily: RRFonts.RobotoBoldIttalic,
          marginBottom: 10,
        }}
      >
        {'ABOUT'}
      </Text>
    )
  }, [isMobile])

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
          alignItems: 'flex-start',
          flexDirection: 'column',
          paddingTop: 30,
          paddingBottom: Platform.OS === 'web' ? FOOTER_HEIGHT : 0,
          justifyContent: 'center',
          backgroundColor: Theme.primary_light,
          flex: 1,
          paddingHorizontal: 40,
        }}
      >
        {renderTopHeader()}

        <Text style={styles.header}>Mobile Background</Text>
        <Text style={styles.body}>
          As a seasoned Senior React Native Developer and Software Engineer, I specialize in
          delivering innovative and robust mobile applications across various industries. With a
          solid foundation in Computer Science from the University of Michigan and expertise in a
          multitude of programming languages including TypeScript, Swift, Objective-C, Java, and Go,
          I've consistently spearheaded projects that push boundaries and exceed expectations.
        </Text>
        <Text style={styles.header}>Applications and Experience</Text>
        <Text style={styles.body}>
          Throughout my tenure at esteemed companies like Swoogo, Ally, and Gen Con, I've showcased
          my proficiency in React-Native, shaping dynamic mobile experiences that resonate with
          users. From enhancing stability and implementing critical bug fixes to integrating offline
          sync functionality and expanding electronic ticketing capabilities, I've consistently
          elevated the performance and usability of mobile applications.
        </Text>
        <Text style={styles.header}>Client-Centric Approach</Text>
        <Text style={styles.body}>
          Collaborating closely with stakeholders and engineering teams, I ensure that every
          solution aligns with business objectives and user needs. From conceptualization to
          deployment, I leverage my expertise to mentor junior engineers, drive product innovation,
          and exceed project milestones.
        </Text>
        <Text style={styles.header}>Independent Contracts and Projects</Text>
        <Text style={styles.body}>
          From sole creation of mobile applications like CareExchange to providing key updates for
          Muze Frame and DND Mobile App, I've demonstrated my ability to deliver high-quality
          solutions independently and within diverse team environments.
        </Text>
        <Text style={styles.header}>Beyond Mobile Development</Text>
        <Text style={styles.body}>
          My passion for technology extends beyond mobile development. Projects like Brooks Rec
          League, where I overhauled a local adult basketball league's web presence, showcase my
          versatility and commitment to delivering tailored solutions that make a lasting impact.
        </Text>
        {renderFocus()}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    textAlign: 'left',
    marginTop: 30,
    fontWeight: '600',
    color: Theme.blue,
  },
  body: {
    fontSize: 20,
    textAlign: 'left',
    marginTop: 5,
    color: Theme.blue,
  },
})

export default withFooter(connect(mapStateToProps)(Solutions))
