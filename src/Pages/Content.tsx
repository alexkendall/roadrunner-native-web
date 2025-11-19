import { View, Image, ScrollView } from 'react-native'
import { DialogueContent, DialogueContentType } from '../Data/DialogueContent'

export const Content = () => {

    const renderContent = (item: DialogueContentType, index: number) => {
        return (
            <Image key={index.toString()} source={{ uri: item.image }} style={{ width: 300, height: 300, margin: 10 }} />
        )
    }
    return (

        <ScrollView>
            <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                {DialogueContent.map((item: DialogueContentType, index) => (
                    renderContent(item, index)
                ))}
            </View>
        </ScrollView>
    )

}


