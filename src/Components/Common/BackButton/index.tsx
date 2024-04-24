import { TouchableOpacity } from "react-native";
import { navigationRef } from "../../../Navigation";
import { Image } from "react-native";

interface Props {
  onPress?: () => void
}
export const BackButton = ({onPress} : Props) => {
  if (!navigationRef || !navigationRef || !navigationRef?.canGoBack()) {
    return null;
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
