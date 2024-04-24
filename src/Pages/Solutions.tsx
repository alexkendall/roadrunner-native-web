import { useCallback } from "react";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import RRCardView from "../Components/Common/CardView";
import Theme from "../Config/Theme";
import { RootState } from "../Redux/Store";
import { WordpressPost } from "../Redux/Slices/WordpressSlice";
import { View, Text, ScrollView, Platform } from 'react-native'
import { useDimensions } from "react-native-web-hooks";
import { RRFonts } from "../Config/Fonts";
import withFooter from "../Hoc/withFooter";
import { FOOTER_HEIGHT } from "../Redux/Slices/WindowSlice";
import SolutionsData from "../Data/Solutions";

const mapStateToProps = (state: RootState) => {
  return {
    solutions_data: Object.values(SolutionsData),
    width: state.window.content_width,
    tab_height: state.window.tab_height,
    paddingRight: state.window.paddingRight,
    paddingTop: state.window.paddingTop,
    isMobile: state.window.isMobile,
    content_width: state.window.content_width,
  };
};

interface Props {
  solutions_data?: Array<Record<string, any>>;
  posts?: Array<WordpressPost>;
  tab_height?: number;
  paddingRight?: number;
  paddingTop?: number;
  isMobile?: boolean;
  content_width: number;
}

const Solutions = ({
  solutions_data,
  paddingRight,
  paddingTop,
  isMobile,
  content_width
}: Props) => {

  const dimensions = useDimensions().window

  const renderThumbnail = useCallback((solution: Record<string, any>, index: number) => {
    const header: string = solution?.title;
    const content: string = solution?.body
    const thumbnail: string = solution?.asset
    return (
      <RRCardView
        key={index}
        config={{ title: header, description: content, asset: thumbnail }}
        imageSize={100}
        backgroundColor={Theme.primary_light}
        color={Theme.primary}
        animationDelay={2.0 * index}
        animationDuration={3.0}
      />
    );
  }, [dimensions]);

  const renderTopHeader = useCallback(() => {
    return (
      <View
        style={{
          backgroundColor: Theme.primary,
          width: "100%",
          paddingBottom: "5%",
        }}
      >
        <Text
          style={{
            fontSize: isMobile ? 20 : 60,
            color: Theme.primary_light,
            fontFamily: RRFonts.RobotoBoldIttalic,
            marginBottom: 10,
          }}
        >
          {"OUR SOLUTIONS"}
        </Text>
        <Text
          style={{
            zIndex: 1,
            color: Theme.primary_light,
            textAlign: "left",
            maxWidth: 1000,
            fontSize: 20,
            fontFamily: RRFonts.Menlo
          }}
        >
          {
            "We create solutions in the mobile space using the latest technology and guidelines."
          }
        </Text>
      </View >
    );
  }, [isMobile]);

  const renderFocus = useCallback(() => {
    return (
      <View style={{ padding: 40, zIndex: 1 }}>
        <View
          style={{
            width: content_width,
            marginLeft: "5%",
            height: 3,
            backgroundColor: Theme.primary,
          }}
        />
        <Text
          style={{
            color: Theme.primary,
            paddingHorizontal: 30,
            width: content_width,
            textAlign: "center",
            fontSize: 18,
            paddingTop: 20,
            fontFamily: RRFonts.Menlo
          }}
        >
          {
            "Our focus is on providing mobile solutions for businesses. Our process involves several steps and iterations across design, development, and production."
          }
        </Text>
      </View>
    );
  }, [content_width]);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Theme.primary, }}>
      <View
        style={{
          display: "flex",
          alignItems: "flex-start",
          flexDirection: "column",
          paddingTop: paddingTop,
          paddingRight: paddingRight,
          paddingBottom: Platform.OS === "web" ? FOOTER_HEIGHT : 0,
          justifyContent: "center",
          backgroundColor: Theme.primary,
          flex: 1,
          paddingHorizontal: 40
        }}
      >
        {renderTopHeader()}
      
        <Text style={styles.header}>
          Mobile Solutions
        </Text>
          <Text style={styles.body}>
          As a seasoned Senior React Native Developer and Software Engineer, I specialize in delivering innovative and robust mobile applications across various industries. With a solid foundation in Computer Science from the University of Michigan and expertise in a multitude of programming languages including TypeScript, Swift, Objective-C, Java, and Go, I've consistently spearheaded projects that push boundaries and exceed expectations.
        </Text>
        <Text style={styles.header}>
          Mobile Development Expertise:
        </Text>
          <Text style={styles.body}>
            Throughout my tenure at esteemed companies like Swoogo, Ally, and Gen Con, I've showcased my proficiency in React-Native, shaping dynamic mobile experiences that resonate with users. From enhancing stability and implementing critical bug fixes to integrating offline sync functionality and expanding electronic ticketing capabilities, I've consistently elevated the performance and usability of mobile applications.
          </Text>
          {renderFocus()}
        </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: "600",
    textAlign: "left",
    marginTop: 30,
  },
  body: {
    fontSize: 20,
    textAlign: "left"
  }
})

export default withFooter(connect(mapStateToProps)(Solutions));
