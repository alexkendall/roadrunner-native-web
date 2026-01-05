import { TouchableOpacity } from 'react-native'
import { Image } from 'react-native'
import { asyncCanGoBack, goBack as asyncGoBack } from '../../../Navigation'
import { useEffect, useState } from 'react'
  
interface Props {
  onPress?: () => void
}

const RR_LOGO_URL = 'https://firebasestorage.googleapis.com/v0/b/roadrunner-native-web.appspot.com/o/Navigation%2FRRH2.png?alt=media&token=ef756a4e-cb71-4046-b990-1fa64d5242e5'
const CHEVRON_BACK_ICON_URL = 'https://firebasestorage.googleapis.com/v0/b/roadrunner-native-web.appspot.com/o/Navigation%2Fchevron_back.png?alt=media&token=a02e2ef6-9494-4aff-ad66-f2c080895468'

export const BackButton = ({ onPress }: Props) => {

  const [canGoBack, setCanGoBack] = useState(false)

  useEffect(() => {
    asyncCanGoBack().then((canGoBack) => {
      setCanGoBack(canGoBack)
    })
  }, [])

  if (!canGoBack) {
    return (
      <Image
        resizeMode="contain"
        style={{ width: 80, height: 80, marginLeft: 10 }}
        source={{
          uri: RR_LOGO_URL,
        }}
      />
    )
  }

  return (
      <TouchableOpacity onPress={onPress ?? (async () => { await asyncGoBack() })}>
      <Image
        style={{ height: 20, width: 20, marginLeft: 10 }}
      source={{ uri: CHEVRON_BACK_ICON_URL }}
    />  </TouchableOpacity>
  )
}
