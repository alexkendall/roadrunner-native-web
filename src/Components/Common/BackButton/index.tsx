import Icon from '@expo/vector-icons/Entypo';
import Theme from '../../../Config/Theme';
import { TouchableOpacity, Text } from 'react-native';
import { navigationRef } from '../../../Navigation';

export const BackButton = () => {

    if(!navigationRef) {
        return null
    }
    if(!navigationRef?.canGoBack()) {
        return null
    }
    return (<TouchableOpacity onPress={navigationRef.goBack}><Icon color={Theme.primary} size={30} name='chevron-left'/></TouchableOpacity>)
}