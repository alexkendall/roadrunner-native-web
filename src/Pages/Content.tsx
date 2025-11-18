import { View, Image, ScrollView } from 'react-native'
import { DialogueContent } from '../Data/DialogueContent'

export const Content = () => {

    const renderContent = (item: any) => {
        return (
            <Image source={{ uri: item.image }} style={{ width: 300, height: 300, margin: 10 }} />
        )
    }
    return (

        <ScrollView>
            <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                {DialogueContent.map((item: any) => (
                    renderContent(item)
                ))}
            </View>
        </ScrollView>
    )

}


