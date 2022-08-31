import { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import Theme from "../Config/Theme";
import SplitView from "../Components/Common/SplitView";
import Solutions from "./Solutions";
import Cases from "./Cases";
import { RootState } from "../Redux/Store";
import { View, Image, Text, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native'
import { useDimensions } from "react-native-web-hooks";
import { useNavigation } from '@react-navigation/native';
import { ScreenNavigationRoutes } from "../Config/PageRoutes";

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


  const dimensions = useDimensions().window

  const navigation = useNavigation()

  useEffect(() => {
    /*
    document.body.style.backgroundColor = Theme.light_green;
    const element = document.getElementById("root");
    if (element) {
      element.style.backgroundColor = Theme.light_green;
    }
    */
  }, []);

  const renderOptionWeb = useCallback(
    (text: string, color: string, backgroundColor: string, link: string, route: string) => {
      const paddingHorizontal: number = isMobile ? 50.0 : 100.0;
      const paddingVertical: number = isMobile ? 100.0 : 200.0;
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(route)
          }}
          style={{
            height: SPLIT_VIEW_HEIGHT_WEB,
            padding: paddingHorizontal,
            paddingTop: paddingVertical,
            paddingBottom: paddingVertical,
            backgroundColor,
            border: "1px solid black",
            borderRightWidth: 0,
            borderLeftWidth: 0,
            borderColor: Theme.primary,
          }}
        >
          <Text style={{ color, fontSize: 50 }}>{text}</Text>
        </TouchableOpacity>
      );
    },
    [isMobile]
  );

  const renderOptionMobile = useCallback(
    (text: string, color: string, backgroundColor: string, link: string, route: string) => {
      const paddingHorizontal: number = isMobile ? 50.0 : 100.0;
      const paddingVertical: number = isMobile ? 100.0 : 200.0;
      return (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate(route)
          }}
          style={{
            width: "100%",
            padding: paddingHorizontal,
            paddingTop: paddingVertical,
            paddingBottom: paddingVertical,
            backgroundColor,
            border: "1px solid black",
            borderRightWidth: 0,
            borderLeftWidth: 0,
            borderColor: Theme.primary,
          }}
        >
          <Text style={{ color, fontSize: 50 }}>{text}</Text>
        </TouchableOpacity>
      );
    },
    [isMobile]
  );

  // SplitView content for Top Options
  const renderOption = isMobile ? renderOptionMobile : renderOptionWeb;
  const renderSplitLeftComponent = () =>
    renderOption(
      "MOBILE SOLUTIONS THIS WAY",
      Theme.light_green,
      Theme.primary,
      "solutions",
      ScreenNavigationRoutes.SOLUTIONS,
    );
  const renderSplitRightComponent = () =>
    renderOption(
      "CASE STUDIES THIS WAY",
      Theme.primary,
      Theme.light_green,
      "cases",
      ScreenNavigationRoutes.CASES
    );
  const renderSolutionsContent = () => <Solutions />;
  const renderCasesContent = () => <Cases />;

  const renderTopOptions = () => (
    <SplitView
      navigation={navigation}
      height={SPLIT_VIEW_HEIGHT_WEB}
      leftComponent={renderSplitLeftComponent()}
      rightComponent={renderSplitRightComponent()}
      leftContent={renderSolutionsContent()}
      rightContent={renderCasesContent()}
    />
  );

  const renderOverview = useCallback(() => {
    return (
      <View
        style={{
          padding: 50,
          backgroundColor: Theme.light_blue,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ flex: 1, textAlign: "center" }}>
          {
            "Hello,  we are RoadRunner Creative. We design and create mobile applications for businesses."
          }
        </Text>
      </View>
    );
  }, []);

  const renderSingleSolution = (solution: Record<string, any>) => {
    return (
      <View
        key={solution?.label}
        style={{ margin: 20, alignItems: "center", justifyContent: "center" }}
      >
        <Image
          style={{ width: dimensions.width * 0.2, height: dimensions.width * 0.2, maxHeight: 100, maxWidth: 100 }}
          source={{ uri: solution?.icon }}
          resizeMode={"contain"}
        />
        <Text style={{ textAlign: "center", marginTop: 10 }}>
          {solution?.label}
        </Text>
      </View>
    );
  };

  const renderSolutions = useCallback(() => {
    const solutions: Array<Record<string, any>> = homepage_data?.solutions ?? [];
    const title = homepage_data?.solutions_title;
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ScreenNavigationRoutes.SOLUTIONS)
        }}
        style={{
          width: "100%",
          backgroundColor: Theme.white,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 40,
        }}
      >
        <Text style={{ color: Theme.primary, textAlign: "center" }}>{title}</Text>
        <View style={{ display: "flex", flexDirection: "row" }}>
          {solutions.map((s) => {
            console.log("render single solution", s)
            return renderSingleSolution(s);
          })}
        </View>
        <Text
          style={{ marginTop: 40, color: Theme.primary, fontSize: 25, fontWeight: "600", fontStyle: "italic" }}
        >
          {"LEARN MORE"}
        </Text>
      </TouchableOpacity>
    );
  }, [content_width, homepage_data, renderSingleSolution]);

  const renderContact = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate(ScreenNavigationRoutes.CONTACT)
        }}
        style={{
          width: "100%",
          backgroundColor: Theme.primary,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 40,
          paddingBottom: footer_height + 40.0,
        }}
      >
        <Text style={{ color: Theme.light_green, textAlign: "center", fontSize: 40 }}>
          {"LIKE WHAT YOU SEE?"}
        </Text>
        <Text
          style={{
            color: Theme.light_green,
            textAlign: "center",
            marginTop: 40,
            fontSize: 25, fontWeight: "600", fontStyle: "italic"
          }}
        >
          {"CONTACT US"}
        </Text>
      </TouchableOpacity>
    );
  };

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  const transition = {
    duration: 4.0,
    delay: 0.0,
  };
  return (
    <SafeAreaView>
      <ScrollView style={{ height: "100%", width: "100%", }} >
        <View
          animate={"visible"}
          initial={"hidden"}
          variants={variants}
          transition={transition}
          style={{ display: "flex", flex: 1, flexDirection: "column", }}
        >
          {renderTopOptions()}
          {renderOverview()}
          {renderSolutions()}
          {renderContact()}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default connect(mapStateToProps)(Home);
