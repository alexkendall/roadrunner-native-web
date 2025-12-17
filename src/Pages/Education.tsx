import { View, ScrollView, Image, Text } from 'react-native'
import { FirebaseAssetContentType } from '../Types/FirebaseAssetContentType'
import { useEffect, useState } from 'react'
import { fetchAssetImagesFromFirebase } from '../Services/FetchAssetImagesFromFirebase'
import { LoadingIndicator } from '../Components/Common/LoadingIndicator'

const FIREBASE_DIRECTORY = 'Education'

export const Education = () => {
  const [educationContent, setEducationContent] = useState<FirebaseAssetContentType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const height = 300

  useEffect(() => {
    const loadImages = async () => {
      try {
        setLoading(true)
        setError(null)
        const images = await fetchAssetImagesFromFirebase(FIREBASE_DIRECTORY)
        setEducationContent(images)
      } catch (err) {
        console.error('Failed to load education content:', err)
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
          width: height,
          height: height,
          margin: 5,
          borderWidth: 0.5,
          borderColor: '#4c4c4c',
        }}
      />
    )
  }

  if (loading) {
    return <LoadingIndicator message="Loading education..." />
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 }}>
        <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
      </View>
    )
  }

  return (
    <ScrollView>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
        }}
      >
        {educationContent.map((item: FirebaseAssetContentType, index: number) => renderContent(item, index))}
      </View>
    </ScrollView>
  )
}