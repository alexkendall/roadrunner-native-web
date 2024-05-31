import { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import Theme from "../Config/Theme";
import SplitView from "../Components/Common/SplitView";
import About from "./About";
import Cases from "./Cases";
import { RootState } from "../Redux/Store";
import {
  View,
  Image,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useDimensions } from "react-native-web-hooks";
import { useNavigation } from "@react-navigation/native";
import { ScreenNavigationRoutes } from "../Config/PageRoutes";
import { RRFonts } from "../Config/Fonts";
import withFooter from "../Hoc/withFooter";
import { SolutionsPreviewLinks } from "../Data/Solutions";

const mapStateToProps = (state: RootState) => {
  const props = {
    content_height: state.window.content_height ?? 0,
    content_width: state.window.content_width ?? 0,
    paddingTop: state.window.paddingTop,
    homepage_data: state.wordpress.homepage_data,
    isMobile: state.window.isMobile,
    footer_height: state.window.footer_height,
  };
  return props;
};

const SPLIT_VIEW_HEIGHT_WEB = 750;

interface Props {
  content_height: number;
  content_width: number;
  footer_height: number;
  homepage_data: Record<string, any>;
  isMobile: boolean;
}

const Home = ({
  content_height,
  content_width,
  footer_height,
  homepage_data,
  isMobile,
}: Props) => {
  const dimensions = useDimensions().window;

  const navigation = useNavigation();

  const renderOptionWeb = useCallback(
    (
      text: string,
      color: string,
      backgroundColor: string,
      link: string,
      route: string
    ) => {
      const paddingHorizontal: number = isMobile ? 50.0 : 100.0;
      const paddingVertical: number = isMobile ? 100.0 : 200.0;
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(route);
          }}
          style={{
            padding: paddingHorizontal,
            backgroundColor,
            border: "1px solid black",
            borderRightWidth: 0,
            borderLeftWidth: 0,
            borderColor: Theme.primary,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color,
              fontSize: 50,
              fontFamily: RRFonts.RobotoBoldIttalic,
            }}
          >
            {text}
          </Text>
        </TouchableOpacity>
      );
    },
    [isMobile]
  );

  const renderOptionMobile = useCallback(
    (
      text: string,
      color: string,
      backgroundColor: string,
      link: string,
      route: string
    ) => {
      const paddingHorizontal: number = isMobile ? 50.0 : 100.0;
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(route);
          }}
          style={{
            width: "100%",
            padding: paddingHorizontal,
            backgroundColor,
            borderRightWidth: 0,
            borderLeftWidth: 0,
            borderColor: Theme.primary,
          }}
        >
          <Text
            style={{
              color,
              fontSize: 50,
              fontFamily: RRFonts.RobotoBoldIttalic,
            }}
          >
            {text}
          </Text>
        </TouchableOpacity>
      );
    },
    [isMobile]
  );

  // SplitView content for Top Options
  const renderOption = isMobile ? renderOptionMobile : renderOptionWeb;
  const renderSplitLeftComponent = () =>
    renderOption(
      "ABOUT",
      Theme.maize,
      Theme.primary,
      "about",
      ScreenNavigationRoutes.ABOUT
    );
  const renderSplitRightComponent = () =>
    renderOption(
      "CLIENTS",
      Theme.primary,
      Theme.white,
      "cases",
      ScreenNavigationRoutes.CASES
    );

  const renderTopOptions = () => (
    <View>
      {renderSplitLeftComponent()}
      {renderSplitRightComponent()}
    </View>
  );

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  const transition = {
    duration: 4.0,
    delay: 0.0,
  };

  const uri = isMobile
    ? "https://firebasestorage.googleapis.com/v0/b/roadrunner-native-web.appspot.com/o/bio%2Falex_harrison_mobile%202.jpg?alt=media&token=419f66d6-c94d-4c64-8721-a8abc6572aef"
    : "https://firebasestorage.googleapis.com/v0/b/roadrunner-native-web.appspot.com/o/bio%2Falex_harrison_profile.jpg?alt=media&token=7234e499-9f37-4621-9345-b45cd3c863d2";
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Theme.primary }}>
      <ScrollView style={{ height: "100%", width: "100%" }}>
        <Image style={{ width: "100%", height: 450 }} source={{ uri }} />
        <View
          animate={"visible"}
          initial={"hidden"}
          variants={variants}
          transition={transition}
          style={{ display: "flex", flex: 1, flexDirection: "column" }}
        >
          {renderTopOptions()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default withFooter(connect(mapStateToProps)(Home));
