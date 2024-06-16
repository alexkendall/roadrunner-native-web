import Theme from '../Config/Theme'
import { connect } from 'react-redux'
import { RootState } from '../Redux/Store'
import { View, Text } from 'react-native'
import { RRFonts } from '../Config/Fonts'
import withFooter from '../Hoc/withFooter'

const mapStateToProps = (state: RootState) => {
  return {
    paddingTop: state.window.paddingTop,
    isMobile: state.window.isMobile,
  }
}

interface Props {
  paddingTop: number
  isMobile: boolean
}

const Contact = ({ isMobile }: Props) => {
  return (
    <View style={{ paddingTop: 40, height: '100%', backgroundColor: Theme.white }}>
      <Text
        style={{
          paddingLeft: isMobile ? 20 : 50,
          paddingRight: isMobile ? 20 : 50,
          color: Theme.blue,
          fontSize: isMobile ? 20 : 30,
          height: 500,
          textAlign: 'center',
          fontFamily: RRFonts.RobotoMedium,
        }}
      >
        {
          'Feel free to contact me at alex.h@roadrunnercreative.com and I will get to you as soon as possible.'
        }
      </Text>
    </View>
  )
}

export default withFooter(connect(mapStateToProps)(Contact))
