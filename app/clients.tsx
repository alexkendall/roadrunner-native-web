import { connect } from 'react-redux'
import Theme from '../src/Config/Theme'
import { RootState } from '../src/Redux/Store'
import { View, Text, Image, ScrollView } from 'react-native'
import { RRFonts } from '../src/Config/Fonts'
import withFooter from '../src/Hoc/withFooter'
import { CasesData } from '../src/Config/Cases'

const mapStateToProps = (state: RootState) => {
  return {
    tab_height: state.window.tab_height,
    paddingRight: state.window.paddingRight,
    paddingTop: state.window.paddingTop,
    isMobile: state.window.isMobile,
    content_height: state.window.content_height,
    content_width: state.window.content_width,
  }
}

interface Props {
  paddingTop: number
  isMobile: boolean
  content_height: number
  content_width: number
}

const clients = ({ isMobile }: Props) => {
  return (
    <ScrollView style={{ height: '100%',flex: 1, backgroundColor: Theme.white }}>
      <View
        style={{
          display: 'flex',
          paddingTop: 20,
          backgroundColor: Theme.white,
          flexDirection: 'column',
          alignItems: 'center',
          paddingLeft: 40,
          paddingRight: 40,
          paddingBottom: 60,
        }}
      >
        <Text
          style={{
            color: Theme.blue,
            fontSize: isMobile ? 24 : 70,
            textAlign: 'center',
            marginBottom: 10,
            fontFamily: RRFonts.RobotoBoldIttalic,
          }}
        >
          {'CLIENTS'}
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            backgroundColor: Theme.white,
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {CasesData.map((payload, index) => {
            return (
              <Image
                key={index.toString()}
                resizeMode="contain"
                source={{ uri: payload.featured_graphic }}
                style={{ height: 100, width: 250, margin: 20 }}
              />
            )
          })}
        </View>
      </View>
    </ScrollView>
  )
}

export default withFooter(connect(mapStateToProps)(clients))
