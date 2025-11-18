import { View, ScrollView, Image } from 'react-native'
import { PhotographyContentType, PhotographyContent } from '../Data/Photograph'



// 4592 × 3448
export const Photography = () => {

    const ratio = 4952 / 3448
    const height = 300



    const renderPhotography = (item: PhotographyContentType, index: number) => {
        return (
            <Image key={index.toString()} source={{ uri: item.image }} style={{
                width: height * ratio, height: height, margin: 5, borderWidth: 0.5, borderColor: '#4c4c4c',
            }} />
        )
    }
    return (
        <ScrollView>
            <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                {PhotographyContent.map((item: PhotographyContentType, index: number) => (
                    renderPhotography(item, index)
                ))}
            </View>
        </ScrollView>
    )
}