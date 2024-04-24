import { TouchableOpacity } from "react-native";
import { navigationRef } from "../../../Navigation";
import { Image } from "react-native";

interface Props {
  onPress?: () => void
}
export const BackButton = ({onPress} : Props) => {
  if (!navigationRef || !navigationRef || !navigationRef?.canGoBack()) {
    return (
      <Image resizeMode="contain" style={{width: 50, height: 50, marginLeft: 10}} source={{uri: "https://firebasestorage.googleapis.com/v0/b/roadrunner-native-web.appspot.com/o/bio%2FBlock_M-Hex.png?alt=media&token=de195572-c606-47cb-a972-4e98416800ff"}}/>
    )
  }

  return (
    <TouchableOpacity onPress={onPress ?? navigationRef.goBack}>
      <Image
        style={{ height: 20, width: 20, marginLeft: 10 }}
        source={require("../../../../assets/Branding/chevron_back.png")}
      />
    </TouchableOpacity>
  );
};
