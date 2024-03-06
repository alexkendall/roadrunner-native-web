import Icon from "@expo/vector-icons/Ionicons";
import Theme from "../../../Config/Theme";
import { TouchableOpacity, Text } from "react-native";
import { navigationRef } from "../../../Navigation";
import { useFonts } from "expo-font";

export const BackButton = () => {
  const [loaded] = useFonts({
    Ionicons: require("@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/Ionicons.ttf"),
  });

  if (
    !navigationRef ||
    !navigationRef ||
    !navigationRef?.canGoBack() ||
    !loaded
  ) {
    return null;
  }

  return (
    <TouchableOpacity onPress={navigationRef.goBack}>
      <Icon color={Theme.primary} size={30} name="chevron-left" />
    </TouchableOpacity>
  );
};
