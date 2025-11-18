import Theme from '../Config/Theme'
import { TouchableOpacity, Linking, Image } from 'react-native'
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

  const mailIcon = "https://firebasestorage.googleapis.com/v0/b/roadrunner-native-web.appspot.com/o/Case-Studies%2Fmail.png?alt=media&token=a6ccd8de-838c-491d-b82d-2cf591bd029e"
  const instagramIcon = "https://firebasestorage.googleapis.com/v0/b/roadrunner-native-web.appspot.com/o/Case-Studies%2Finstgram.jpg?alt=media&token=de432c95-a3bd-4423-9825-74cf042cc09b"

  const renderContactInfo = (uri: string, text: string, onPress: () => void) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
        <Image source={{ uri }} style={{ width: 40, height: 40, marginRight: 10 }} />
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
          fontFamily: RRFonts.RobotoMediumIttalic,
          fontWeight: '200',
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
          fontWeight: '200',
        }}
      >
        {renderContactInfo(mailIcon, "info.h@roadrunnercreative.com", () => Linking.openURL("mailto:info.h@roadrunnercreative.com"))}
        {renderContactInfo(instagramIcon, "@roadrunner.creative", () => Linking.openURL("https://www.instagram.com/roadrunner.creative/"))}
      </Text>
    </View>
  )
}

export default withFooter(connect(mapStateToProps)(Contact))
