import { View, ScrollView, Image, Text } from 'react-native'
import { PhotographyContentType } from '../Data/Photograph'
import { useEffect, useState } from 'react'
import { fetchPhotographyImages } from '../Services/PhotographyService'
import { LoadingIndicator } from '../Components/Common/LoadingIndicator'

export const MentalHealth = () => {
    const [mentalHealthContent, setMentalHealthyContentContent] = useState<PhotographyContentType[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const height = 300

    useEffect(() => {
        const loadImages = async () => {
            try {
                setLoading(true)
                setError(null)
                const images = await fetchPhotographyImages(true)
                setMentalHealthyContentContent(images)
            } catch (err) {
                console.error('Failed to load content:', err)
                setError('Failed to load content. Please try again later.')
            } finally {
                setLoading(false)
            }
        }

        loadImages()
    }, [])

    const renderContent = (item: PhotographyContentType, index: number) => {
        return (
            <Image key={index.toString()} source={{ uri: item.image }} style={{
                width: height, height: height, margin: 5, borderWidth: 0.5, borderColor: '#4c4c4c',
            }} />
        )
    }

    if (loading) {
        return <LoadingIndicator message="Loading mental health content..." />
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
                {mentalHealthContent.map((item: PhotographyContentType, index: number) => (
                    renderContent(item, index)
                ))}
            </View>
        </ScrollView>
    )
}
