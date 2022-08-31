import { useCallback } from "react";
import Theme from "../../../Config/Theme";
import { TouchableOpacity, View, Linking, Text } from 'react-native'

const FOOTER_HEIGHT = 50.0;

const SocialFooter = () => {
  const renderEmail = useCallback((color: string) => {
    return (
      <a href="./contact">
        <h6
          style={{
            fontStyle: "italic",
            fontSize: 14,
            color: color,
            marginRight: 50,
          }}
        >
          {"E-MAIL"}
        </h6>
      </a>
    );
  }, []);

  const renderInstagram = useCallback((color: string) => {
    return (
      <TouchableOpacity onPress={() => {
        Linking.openURL("https://www.instagram.com/roadrunner.creative/")
      }
      }
      >
        <Text style={{ color: color, fontStyle: "italic", fontSize: 14 }}>
          {"@ROADRUNNER.CREATIVE"}
        </Text>
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
        backgroundColor: Theme.light_blue,
      }}
    >
      {renderEmail(Theme.primary)}
      {renderInstagram(Theme.primary)}
    </View>
  );
};

export default SocialFooter;
