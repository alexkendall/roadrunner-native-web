import { View, ScrollView, Image, Text } from 'react-native'
import { PhotographyContentType } from '../Data/Photograph'
import { useEffect, useState } from 'react'
import { fetchPhotographyImages } from '../Services/PhotographyService'
import { LoadingIndicator } from '../Components/Common/LoadingIndicator'

export const Photography = () => {
    const [photographyContent, setPhotographyContent] = useState<PhotographyContentType[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const ratio = 4952 / 3448
    const height = 300

    useEffect(() => {
        const loadImages = async () => {
            try {
                setLoading(true)
                setError(null)
                const images = await fetchPhotographyImages()
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

    const renderPhotography = (item: PhotographyContentType, index: number) => {
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

    console.log("photographyContent", photographyContent)


    return (
        <ScrollView>
            <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                {photographyContent.map((item: PhotographyContentType, index: number) => (
                    renderPhotography(item, index)
                ))}
            </View>
        </ScrollView>
    )
}
