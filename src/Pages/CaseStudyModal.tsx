import { useCallback, useMemo } from 'react'
import { connect } from 'react-redux'
import Theme from '../Config/Theme'
import { RootState } from '../Redux/Store'
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  ScrollView,
  Modal,
  StyleSheet,
  SafeAreaView,
  Linking,
} from 'react-native'
import { useDimensions } from 'react-native-web-hooks'
import { RRFonts } from '../Config/Fonts'
import { CasesData } from '../Config/Cases'
import { BackButton } from '../Components/Common/BackButton'

const mapStateToProps = (state: RootState) => {
  return {
    tab_height: state.window.tab_height,
    paddingRight: state.window.paddingRight,
    paddingTop: state.window.paddingTop,
    isMobile: state.window.isMobile,
    content_height: state.window.content_height,
    content_width: state.window.content_width,
    window_width: state.window.window_width,
    footer_height: state.window.footer_height,
  }
}

interface Props {
  data: CasesData
  visible: boolean
  onClose: () => void
  tab_height: number
  paddingRight: number
  paddingTop: number
  isMobile: boolean
  content_height: number
  content_width: number
  window_width: number
  footer_height: number
}

const CaseStudyModal = ({
  data,
  visible,
  onClose,
  isMobile,
  content_width,
  window_width,
}: Props) => {
  const dimensions = useDimensions().window

  const styles = useMemo(() => {
    return StyleSheet.create({
      button: {
        backgroundColor: Theme.primary,
        width: 150,
        height: 40,
        alignItems: 'center',
        borderRadius: 10,
        color: 'white',
        justifyContent: 'center',
        marginTop: 10,
      },
      buttonText: {
        color: Theme.primary_light,
      },
      label: {
        color: Theme.primary,
        marginTop: isMobile ? 20.0 : 0.0,
        fontWeight: '600',
        marginBottom: 10,
        fontSize: isMobile ? 20 : 24,
        fontFamily: RRFonts.RobotoBlack,
      },
      content: {
        fontSize: isMobile ? 13 : 16,
        color: Theme.primary,
        fontFamily: RRFonts.RobotoMedium,
        fontWeight: '800',
      },
      thumbnailImage: {
        height: dimensions.width * 0.2,
        width: dimensions.width * 0.2,
      },
      typeLabel: {
        fontSize: isMobile ? 20 : 24,
        color: Theme.primary,
        fontFamily: RRFonts.RobotoMedium,
      },
    })
  }, [dimensions, isMobile])

  const renderChallenge = useCallback(() => {
    return (
      <View style={{ paddingVertical: 40 }}>
        <Text style={styles.label}>{'THE CHALLENGE'}</Text>
        <Text style={styles.content}>{data.data.challenge}</Text>
      </View>
    )
  }, [isMobile, data, content_width, dimensions])

  const renderInsight = useCallback(() => {
    return (
      <View
        style={{
          display: 'flex',
          zIndex: 1,
          marginBottom: 40,
        }}
      >
        <Text style={styles.label}>{'INSIGHT'}</Text>
        <Text style={styles.content}>{data.data.solutions}</Text>
      </View>
    )
  }, [content_width, isMobile, data, dimensions])

  const renderDelivery = useCallback(() => {
    return (
      <View
        style={{
          display: 'flex',
          paddingBottom: 40,
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={styles.label}>{'DELIVERY'}</Text>
          <Text style={styles.content}>{data.data.delivery}</Text>
        </View>
      </View>
    )
  }, [content_width, isMobile, data, dimensions])

  const renderButtons = useCallback(() => {
    return null
    let button1 = null
    let button2 = null
    if (data?.primary_link && data?.primary_link_label) {
      button1 = (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Linking.openURL(data?.primary_link)
          }}
        >
          <Text style={styles.buttonText}>{data?.primary_link_label}</Text>
        </TouchableOpacity>
      )
    }
    if (data?.secondary_link && data?.secondary_link_label) {
      button2 = (
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            Linking.openURL(data?.secondary_link)
          }}
        >
          <Text style={styles.buttonText}>{data?.secondary_link_label}</Text>
        </TouchableOpacity>
      )
    }
    return (
      <View>
        {button1}
        {button2}
      </View>
    )
  }, [data])

  const renderDescription = useCallback(() => {
    return (
      <View style={{ padding: 40, paddingTop: 0, zIndex: 1 }}>
        <Text
          style={{
            zIndex: 1,
            textAlign: 'left',
            fontFamily: RRFonts.RobotoBoldIttalic,
            color: Theme.primary,
            fontSize: isMobile ? 30 : 70,
            marginBottom: 10,
          }}
        >
          {''}
        </Text>
        <Text
          style={{
            zIndex: 1,
            fontSize: 21,
            color: Theme.primary,
            fontFamily: RRFonts.Menlo,
            marginBottom: 10,
          }}
        >
          {''}
        </Text>
        {renderButtons()}
      </View>
    )
  }, [renderButtons, isMobile, data])

  const renderServices = useCallback(() => {
    const client: string = data?.data.client
    const industry: string = data?.data.industry
    const services: Array<string> = data?.data.services
    let service_elt = null
    if (services) {
      service_elt = (
        <View>
          {services.map((service, index) => {
            return (
              <Text key={index.toString()} style={styles.content} key={index}>
                {service}
              </Text>
            )
          })}
        </View>
      )
    }
    return (
      <View style={{ marginRight: 100, padding: 40 }}>
        <Text style={styles.typeLabel}>{'CLIENT'}</Text>
        <Text style={styles.content}>{client}</Text>
        <View
          style={{
            width: 250,
            height: 1,
            marginTop: 20,
            marginBottom: 20,
            backgroundColor: Theme.primary,
          }}
        />
        <Text style={styles.typeLabel}>{'INDUSTRY'}</Text>
        <Text style={styles.content}>{industry}</Text>
        <View
          style={{
            width: 250,
            height: 1,
            marginTop: 20,
            marginBottom: 20,
            backgroundColor: Theme.primary,
          }}
        />
        <Text style={styles.typeLabel}>{'SERVICES'}</Text>
        {service_elt}
      </View>
    )
  }, [data])

  if (!visible ?? !data) {
    return null
  }
  let thumbnail = null
  if (data.data.featured_graphic) {
    thumbnail = (
      <Image
        style={{ height: dimensions.height * 0.2, width: '100%', objectFit: 'cover' }}
        source={{ uri: data.data.featured_graphic }}
      />
    )
  }
  return (
    <Modal style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView>
          <TouchableOpacity style={{ marginTop: 10, marginLeft: 10 }} onPress={onClose}>
            <BackButton onPress={onClose} />
          </TouchableOpacity>
          <View style={{ backgroundColor: Theme.white }}>
            <Image
              resizeMode="contain"
              style={{ height: 50, width: 'auto', marginTop: 20, marginLeft: 40 }}
              source={{ uri: data.featured_graphic }}
            />
            <View style={{ flex: 1, borderBottomWidth: 1, marginTop: 20 }} />
            {renderServices()}
            {thumbnail}
            <View style={{ paddingHorizontal: 40 }}>
              {renderChallenge()}
              {renderInsight()}
              {renderDelivery()}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  )
}

export default connect(mapStateToProps)(CaseStudyModal)
