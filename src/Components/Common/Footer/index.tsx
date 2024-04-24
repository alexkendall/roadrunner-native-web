import { useCallback } from "react";
import Theme from "../../../Config/Theme";
import { TouchableOpacity, View, Linking, Text } from 'react-native'
import * as RootNavigation from '../../../Navigation'

const FOOTER_HEIGHT = 50.0;

const SocialFooter = () => {
  const rendermaize = useCallback((color: string) => {
    return (
      <TouchableOpacity onPress={() => {
        RootNavigation.navigate("Contact")
      }}>
        <Text
          style={{
            fontStyle: "italic",
            fontSize: 14,
            color: color,
            marginRight: 50,
          }}
        >
          {"E-MAIL"}
        </Text>
      </TouchableOpacity>
    );
  }, [RootNavigation]);

  const renderEmail = useCallback((color: string) => {
    return (
      <TouchableOpacity onPress={() => {
        Linking.openURL('mailto:alex.h@roadrunnercreative.com.com?subject=Inquiry&body=') }
      }
      >
        <Text style={{ color: color, fontStyle: "italic", fontSize: 14 }}>
          {"EMAIL   ALEX.H@ROADRUNNERCREATIVE.COM"}
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
        backgroundColor: Theme.blue,
      }}
    >
      {renderEmail(Theme.maize)}
    </View>
  );
};

export default SocialFooter;
