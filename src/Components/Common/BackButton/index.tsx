import { TouchableOpacity } from 'react-native'
import { navigationRef } from '../../../Navigation'
import { Image } from 'react-native'

interface Props {
  onPress?: () => void
}
export const BackButton = ({ onPress }: Props) => {
  if (!navigationRef || !navigationRef || !navigationRef?.canGoBack()) {
    return (
      <Image
        resizeMode="contain"
        style={{ width: 80, height: 80, marginLeft: 10 }}
        source={{
          uri: 'https://firebasestorage.googleapis.com/v0/b/roadrunner-native-web.appspot.com/o/Navigation%2FRRH2.png?alt=media&token=ef756a4e-cb71-4046-b990-1fa64d5242e5',
        }}
      />
    )
  }

  return (
    <TouchableOpacity onPress={onPress ?? navigationRef.goBack}>
      <Image
        style={{ height: 20, width: 20, marginLeft: 10 }}
        source={require('../../../../assets/Branding/chevron_back.png')}
      />
    </TouchableOpacity>
  )
}
