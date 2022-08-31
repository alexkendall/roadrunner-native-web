import { useCallback } from "react";
import { connect } from "react-redux";
import RRCardView from "../Components/Common/CardView";
import Theme from "../Config/Theme";
import { RootState } from "../Redux/Store";
import { WordpressPost } from "../Redux/Slices/WordpressSlice";
import { View, Text } from 'react-native'

const mapStateToProps = (state: RootState) => {
  return {
    solutions_data: state.wordpress.solutions_data,
    width: state.window.content_width,
    tab_height: state.window.tab_height,
    paddingRight: state.window.paddingRight,
    paddingTop: state.window.paddingTop,
    isMobile: state.window.isMobile,
  };
};

interface Props {
  solutions_data?: Record<string, any>;
  posts?: Array<WordpressPost>;
  tab_height?: number;
  paddingRight?: number;
  paddingTop?: number;
  isMobile?: boolean;
}

const Solutions = ({
  solutions_data,
  paddingRight,
  paddingTop,
  isMobile
}: Props) => {

  const renderThumbnail = useCallback((solution: Record<string, any>, index: number) => {
    const header: string = solution?.title;
    const content: string = solution?.description;
    const thumbnail: string = solution?.icon.url;
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
  }, []);

  const renderTopHeader = useCallback(() => {
    return (
      <View
        style={{
          backgroundColor: Theme.primary,
          width: "100%",
          paddingLeft: "10%",
          paddingRight: "10%",
          paddingBottom: "5%",
        }}
      >
        <Text
          style={{
            zIndex: 1,
            fontSize: isMobile ? "1.75em" : "4.0em",
            color: Theme.primary_light,
          }}
        >
          {"OUR SOLUTIONS"}
        </Text>
        <Text
          className={"B1"}
          style={{
            zIndex: 1,
            color: Theme.primary_light,
            textAlign: "left",
            maxWidth: 1000,
          }}
        >
          {
            "We create solutions in the mobile space using the latest technology and guidelines."
          }
        </Text>
      </View>
    );
  }, [isMobile]);

  const renderFocus = useCallback(() => {
    return (
      <View style={{ padding: 40, zIndex: 1 }}>
        <View
          style={{
            width: "90%",
            marginLeft: "5%",
            height: 3,
            backgroundColor: Theme.primary,
          }}
        />
        <Text
          className={"B2"}
          style={{
            color: Theme.primary,
            padding: "5%",
            textAlign: "center",
            fontWeight: "700",
            fontSize: 19,
          }}
        >
          {
            "Our focus is on providing mobile solutions for businesses. Our process involves several steps and iterations across design, development, and production."
          }
        </Text>
      </View>
    );
  }, []);

  const dataArray = solutions_data?.solutions ?? [];
  return (
    <View
      style={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        paddingTop: paddingTop,
        paddingRight: paddingRight,
        justifyContent: "center",
        backgroundColor: Theme.primary,
      }}
    >
      {renderTopHeader()}
      <View
        style={{
          zIndex: 2,
          display: "flex",
          width: "100%",
          flexWrap: "wrap",
          justifyContent: "center",
          flexDirection: "row",
          backgroundColor: Theme.primary_light,
        }}
      >
        {dataArray.map((item: Record<string, any>, index: number) => {
          return renderThumbnail(item, index);
        })}
        {renderFocus()}
      </View>
    </View>
  );
};

export default connect(mapStateToProps)(Solutions);
