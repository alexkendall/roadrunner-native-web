import { View, Image, ScrollView, Text } from 'react-native'
import { DialogueContentType } from '../Data/DialogueContent'
import { useEffect, useState } from 'react'
import { fetchDialogueContentImages } from '../Services/DialogueContentService'
import { LoadingIndicator } from '../Components/Common/LoadingIndicator'

export const Content = () => {
    const [dialogueContent, setDialogueContent] = useState<DialogueContentType[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        const loadImages = async () => {
            try {
                setLoading(true)
                setError(null)
                const images = await fetchDialogueContentImages()
                setDialogueContent(images)
            } catch (err) {
                console.error('Failed to load dialogue content images:', err)
                setError('Failed to load images. Please try again later.')
            } finally {
                setLoading(false)
            }
        }

        loadImages()
    }, [])

    const renderContent = (item: DialogueContentType, index: number) => {
        return (
            <Image key={index.toString()} source={{ uri: item.image }} style={{ width: 300, height: 300, margin: 10 }} />
        )
    }

    if (loading) {
        return <LoadingIndicator message="Loading content..." />
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
                {dialogueContent.map((item: DialogueContentType, index) => (
                    renderContent(item, index)
                ))}
            </View>
        </ScrollView>
    )
}


