import { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Theme from '../Config/Theme'
import CaseStudyModal from './CaseStudyModal'
import { RootState } from '../Redux/Store'
import { WordpressPost } from '../Redux/Slices/WordpressSlice'
import { View, Text, Image, ScrollView } from 'react-native'
import { RRFonts } from '../Config/Fonts'
import withFooter from '../Hoc/withFooter'
import { CasesData as CasesDataType } from '../Config/Cases'
import { fetchAssetImagesFromFirebase } from '../Services/FetchAssetImagesFromFirebase'
import { FirebaseAssetContentType } from '../Types/FirebaseAssetContentType'
import { LoadingIndicator } from '../Components/Common/LoadingIndicator'

const mapStateToProps = (state: RootState) => {
  return {
    posts: state.wordpress.cases_data,
    tab_height: state.window.tab_height,
    paddingRight: state.window.paddingRight,
    paddingTop: state.window.paddingTop,
    isMobile: state.window.isMobile,
    content_height: state.window.content_height,
    content_width: state.window.content_width,
  }
}

interface Props {
  posts: Array<WordpressPost>
  paddingTop: number
  isMobile: boolean
  content_height: number
  content_width: number
}

const Studies = ({ isMobile }: Props) => {
  const [showModal, setDisplayModal] = useState(false)
  const [modalPayload, setModalPayload] = useState<CasesDataType | null>(null)
  const [caseStudyImages, setCaseStudyImages] = useState<FirebaseAssetContentType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true)
        setError(null)
        const images = await fetchAssetImagesFromFirebase('Case-Studies')
        setCaseStudyImages(images)
      } catch (err) {
        console.error('Failed to load case study images:', err)
        setError('Failed to load images. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    loadImages()
  }, [])

  if (loading) {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20, backgroundColor: Theme.white }}>
      <LoadingIndicator message="Loading software..." />
    </View>

  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
      </View>
    )
  }

  return (
    <ScrollView style={{ height: '100%', backgroundColor: Theme.white }}>
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
          {caseStudyImages.map((item, index) => {
            return (
              <Image
                key={index.toString()}
                resizeMode="contain"
                source={{ uri: item.image }}
                style={{ height: 100, width: 250, margin: 20 }}
              />
            )
          })}
        </View>
        {modalPayload && (
          <CaseStudyModal
            onClose={() => {
              setDisplayModal(false)
            }}
            data={modalPayload}
            visible={showModal}
          />
        )}
      </View>
    </ScrollView>
  )
}

export default withFooter(connect(mapStateToProps)(Studies) as any)
