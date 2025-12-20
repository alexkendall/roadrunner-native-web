import Theme from '../Config/Theme'
import { TouchableOpacity, Linking, Image } from 'react-native'
import { connect } from 'react-redux'
import { RootState } from '../Redux/Store'
import { View, Text } from 'react-native'
import { RRFonts } from '../Config/Fonts'
import withFooter from '../Navigation/withFooter'
import { useState, useEffect } from 'react'
import { getContactIcons } from '../Services/ContactService'
import { LoadingIndicator } from '../Components/Common/LoadingIndicator'

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
  const [mailIcon, setMailIcon] = useState<string>('')
  const [instagramIcon, setInstagramIcon] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true)
        setError(null)
        const icons = await getContactIcons()
        setMailIcon(icons.mailIcon)
        setInstagramIcon(icons.instagramIcon)
      } catch (err) {
        console.error('Failed to load contact images:', err)
        setError('Failed to load images. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    loadImages()
  }, [])

  const renderContactInfo = (uri: string, text: string, onPress: () => void) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
        <Image resizeMode='contain' source={{ uri }} style={{ width: 40, height: 40, marginRight: 10 }} />
        <TouchableOpacity onPress={onPress}>
          <Text>{text}</Text>
        </TouchableOpacity>
      </View>
    )
  }

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: Theme.white }}>
        <LoadingIndicator message="Loading contact..." />
      </View>
    )
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: Theme.white }}>
        <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
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
        {mailIcon && renderContactInfo(mailIcon, "info.h@roadrunnercreative.com", () => Linking.openURL("mailto:info.h@roadrunnercreative.com"))}
        {instagramIcon && renderContactInfo(instagramIcon, "@roadrunner.creative", () => Linking.openURL("https://www.instagram.com/roadrunner.creative/"))}
      </Text>
    </View>
  )
}

export default withFooter(connect(mapStateToProps)(Contact))
