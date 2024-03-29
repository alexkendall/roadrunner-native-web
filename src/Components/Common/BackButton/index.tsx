
import { TouchableOpacity } from "react-native";
import { navigationRef } from "../../../Navigation";
import { Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

interface Props {
  onPress?: () => void
}
export const BackButton = ({onPress} : Props) => {

  const naivigation = useNavigation()
  if (!naivigation.canGoBack) {
    return null;
  }

  return (
    <TouchableOpacity onPress={onPress ?? naivigation.goBack}>
      <Image
        style={{ height: 20, width: 20, marginLeft: 10 }}
        source={require("../../../../assets/Branding/chevron_back.png")}
      />
    </TouchableOpacity>
  );
};
