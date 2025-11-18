import Theme from '../Config/Theme'
import { TouchableOpacity, Linking } from 'react-native'
import { connect } from 'react-redux'
import { RootState } from '../Redux/Store'
import { View, Text } from 'react-native'
import { RRFonts } from '../Config/Fonts'
import withFooter from '../Hoc/withFooter'
import Ionicons from '@expo/vector-icons/Ionicons';

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



  const renderContactInfo = (iconName: string, text: string, onPress: () => void) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
        <Ionicons name={iconName} size={40} color="black" style={{ marginRight: 10 }} />
        <TouchableOpacity onPress={onPress}>
          <Text>{text}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <View style={{ paddingTop: 40, height: '100%', backgroundColor: Theme.white }}>
      <Text
        style={{
          color: Theme.blue,
          fontSize: isMobile ? 24 : 70,
          textAlign: 'center',
          marginBottom: 10,
          fontFamily: RRFonts.RobotoBoldIttalic,
        }}
      >
        {'CONTACT'}
      </Text>
      <Text
        style={{
          paddingLeft: isMobile ? 20 : 50,
          paddingRight: isMobile ? 20 : 50,
          color: Theme.blue,
          fontSize: isMobile ? 20 : 30,
          height: 500,
          textAlign: 'center',
          fontFamily: RRFonts.RobotoMedium,
          flexDirection: "column",
          display: "flex",
        }}
      >
        {renderContactInfo("mail", "info.h@roadrunnercreative.com", () => Linking.openURL("mailto:info.h@roadrunnercreative.com"))}
        {renderContactInfo("logo-instagram", "@roadrunner.creative", () => Linking.openURL("https://www.instagram.com/roadrunner.creative/"))}
      </Text>
    </View>
  )
}

export default withFooter(connect(mapStateToProps)(Contact))
