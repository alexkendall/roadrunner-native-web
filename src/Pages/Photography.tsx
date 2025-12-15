import { View, ScrollView, Image, Text } from 'react-native'
import { FirebaseAssetContentType } from '../Types/FirebaseAssetContentType'
import { useEffect, useState } from 'react'
import { LoadingIndicator } from '../Components/Common/LoadingIndicator'
import { fetchAssetImagesFromFirebase } from '../Services/fetchAssetImagesFromFirebase'

export const Photography = () => {
    const [photographyContent, setPhotographyContent] = useState<FirebaseAssetContentType []>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const ratio = 4952 / 3448
    const height = 300

    useEffect(() => {
        const loadImages = async () => {
            try {
                setLoading(true)
                setError(null)
                const images = await fetchAssetImagesFromFirebase('Photography')
                setPhotographyContent(images)
            } catch (err) {
                console.error('Failed to load photography images:', err)
                setError('Failed to load images. Please try again later.')
            } finally {
                setLoading(false)
            }
        }

        loadImages()
    }, [])

    const renderPhotography = (item: FirebaseAssetContentType , index: number) => {
        return (
            <Image key={index.toString()} source={{ uri: item.image }} style={{
                width: height * ratio, height: height, margin: 5, borderWidth: 0.5, borderColor: '#4c4c4c',
            }} />
        )
    }

    if (loading) {
        return <LoadingIndicator message="Loading photography..." />
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
            <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                {photographyContent.map((item: FirebaseAssetContentType, index: number) => (
                    renderPhotography(item, index)
                ))}
            </View>
        </ScrollView>
    )
}
