import { useCallback } from "react";
import { Image } from "react-native";
import Theme from "../../../Config/Theme";
import { TouchableOpacity, View, Linking, Text } from 'react-native'

const FOOTER_HEIGHT = 50.0;

const SocialFooter = () => {

  const renderEmail = useCallback((color: string) => {
    return (
      <TouchableOpacity onPress={() => {
        Linking.openURL('mailto:alex.h@roadrunnercreative.com.com?subject=Inquiry&body=')
      }
      }
      >
        <Image resizeMode="contain" source={{ uri: "https://firebasestorage.googleapis.com/v0/b/roadrunner-native-web.appspot.com/o/Navigation%2FROADRUNNER_LOGO_WHITE.png?alt=media&token=23d0a9b6-b68a-4825-a3ee-3dada787c9ae" }} style={{ height: 20, width: 400 }} />
      </TouchableOpacity>
    );
  }, []);

  return (
    <View
      style={{
        position: "fixed",
        textAlign: "center",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        bottom: 0,
        height: FOOTER_HEIGHT,
        width: "100%",
        backgroundColor: Theme.blue,
      }}
    >
      {renderEmail(Theme.maize)}
    </View>
  );
};

export default SocialFooter;
