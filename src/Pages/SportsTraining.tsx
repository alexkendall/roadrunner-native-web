import { View, ScrollView, Image, Text, Dimensions } from 'react-native'
import { FirebaseAssetContentType } from '../Types/FirebaseAssetContentType'
import { useEffect, useState } from 'react'
import { fetchAssetImagesFromFirebase } from '../Services/FetchAssetImagesFromFirebase'
import { LoadingIndicator } from '../Components/Common/LoadingIndicator'
import { GoogleDriveVideoEmbed } from '../Components/Common/GoogleDriveVideoEmbed'

// Folder name in Firebase Storage. If your bucket uses a different folder name,
// update this constant (e.g. "Sports-Training" vs "SportsTraining").
const FIREBASE_DIRECTORY = 'Sports-Training'

const VideoContent = [
  {
    title: 'Multiple Hoops Variation',
    description: 'In this scenario, we have 6 open hoops. It is a good usage, to use every hoop. Getting up shots in an open gym allows less pre-planed behavior than a typical drill and simulates a more game-time scenario where ball placement and scenarios are never perfect.',
    video: 'https://drive.google.com/file/d/1Uv1_2jq6MgWvFHC9YH9QjG4txLBM8Jt6/view?usp=sharing',
  },
  {
    title: 'One-On-One Drills',
    description: 'Here we perform different move variations, from all areas in the half court. These moves are more geared towards guards, but show some different variations in finishing, operating into the mid-range, and from outside of the arc. One thing to notice in this video, is how we can use our left hand on the right side of the hoop and our right hand on the left side of the hoop to create better angles.',
    video: 'https://drive.google.com/file/d/1aieZYeuERE1ceT1b3ITT1ZDLbmJD1ceo/view?usp=sharing',
  },
]

export const SportsTraining = () => {
  const [sportsTrainingContent, setSportsTrainingContent] = useState<FirebaseAssetContentType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const width = Dimensions.get('window').width

  const videoWidth =   width < 600 ? width - 20 : 560
  const aspectRatio = 16 / 9
  const imageSize = 300

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true)
        setError(null)
        const images = await fetchAssetImagesFromFirebase(FIREBASE_DIRECTORY)
        setSportsTrainingContent(images)
      } catch (err) {
        console.error('Failed to load sports training content:', err)
        setError('Failed to load content. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    loadImages()
  }, [])

  const renderContent = (item: FirebaseAssetContentType, index: number) => {
    return (
      <Image
        key={index.toString()}
        source={{ uri: item.image }}
        style={{
          width: imageSize,
          height: imageSize,
          margin: 5,
          borderWidth: 0.5,
          borderColor: '#4c4c4c',
        }}
      />
    )
  }

  if (loading) {
    return <LoadingIndicator message="Loading sports training..." />
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
      </View>
    )
  }

  return (
    <ScrollView style={{ padding: 10 }}>
      <Text style={{ fontSize: 30, margin: 10, fontWeight: "bold" }}>
      {"Basketball"}
      </Text>
      {Object.values(VideoContent).map((item) => {
        return (
          <View key={item.title}>
          <Text style={{ fontSize: 30, margin: 10 }}>{item.title}</Text>
          <Text>
            </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              alignItems: 'center',
            }}
          >
    
            <GoogleDriveVideoEmbed
              driveUrlOrId={item.video}
              title={item.title}
              width={videoWidth}
              aspectRatio={aspectRatio}
            />
          </View>
          <Text style={{ fontSize: 18, margin: 10, fontWeight: "300" }}>{item.description}</Text>
        </View>
      )})}
    </ScrollView>
  )
}

