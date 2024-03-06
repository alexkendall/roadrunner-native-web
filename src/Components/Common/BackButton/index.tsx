import Icon from "@expo/vector-icons/Ionicons";
import Theme from "../../../Config/Theme";
import { TouchableOpacity } from "react-native";
import { navigationRef } from "../../../Navigation";
import { Image } from "react-native";

export const BackButton = () => {
  if (!navigationRef || !navigationRef || !navigationRef?.canGoBack()) {
    return null;
  }

  return (
    <TouchableOpacity onPress={navigationRef.goBack}>
      <Image
        style={{ height: 20, width: 20, marginLeft: 10 }}
        source={require("../../../../assets/Branding/chevron_back.png")}
      />
    </TouchableOpacity>
  );
};
