import { ReactNode, useState } from "react";
import { Platform, TouchableOpacity } from "react-native";
import { View } from 'react-native'
import { connect } from "react-redux";
import { RootState } from "../../../Redux/Store";
import { ScreenNavigationRoutes } from "../../../Config/PageRoutes";

const SPLIT_VIEW_MODES = {
  DEFAULT: "DEFAULT",
  HOVER_LEFT: "HOVER_LEFT",
  HOVER_RIGHT: "HOVER_RIGHT",
  LEFT: "LEFT",
  RIGHT: "RIGHT",
};

const mapStateToProps = (state: RootState) => {
  const props = {
    content_height: state.window.content_height ?? 0,
    content_width: state.window.content_width ?? 0,
    paddingTop: state.window.paddingTop,
    isMobile: state.window.isMobile,
    footer_height: state.window.footer_height,
  };
  return props;
};

interface Props {
  leftComponent: ReactNode;
  rightComponent: ReactNode;
  leftContent: ReactNode;
  rightContent: ReactNode;
  isMobile?: boolean;
  paddingTop?: number;
  content_width?: number;
  height: number;
  content_width: number;
  navigation: any;
}

const SplitView = ({
  leftComponent,
  rightComponent,
  leftContent,
  rightContent,
  isMobile,
  content_width,
  height = 0,
  navigation
}: Props) => {

  const [mode, setMode] = useState(SPLIT_VIEW_MODES.DEFAULT);
  const containerStyle = {
    paddingTop: 0,
    display: "flex",
    flexDirection: isMobile ? "column" : "row",
    width: content_width
  };
  if (!isMobile) {
    containerStyle.height = height;
  }

  const onMouseOverLeft = () => {
    setMode(SPLIT_VIEW_MODES.HOVER_LEFT);
  };
  const onMouseOverRight = () => {
    setMode(SPLIT_VIEW_MODES.HOVER_RIGHT);
  };
  const renderDefaultMode = () => {
    return (
      <View style={containerStyle}>
        <View style={{ flex: 1 }} onMouseOver={onMouseOverLeft}>
          {leftComponent}
        </View>
        <View style={{ flex: 1 }} onMouseOver={onMouseOverRight}>
          {rightComponent}
        </View>
      </View>
    );
  };

  const renderHoverPreview = () => {
    const hoverStyle = {
      flex: 1.25,
      height: height,
      alignSelf: "stretch",
      backgroundColor: "red",
    };
    const regularStyle = { flex: 1, height: "100%", alignSelf: "stretch" };
    const styleRight =
      mode === SPLIT_VIEW_MODES.HOVER_RIGHT ? hoverStyle : regularStyle;
    const styleLeft =
      mode === SPLIT_VIEW_MODES.HOVER_LEFT ? hoverStyle : regularStyle;
    return (
      <View
        onMouseLeave={() => {
          if (!SPLIT_VIEW_MODES.LEFT || SPLIT_VIEW_MODES.RIGHT) {
            setMode(SPLIT_VIEW_MODES.DEFAULT);
          }
        }}
        styles={containerStyle}
      >
        <TouchableOpacity
          onMouseOver={onMouseOverLeft}
          style={styleLeft}
          onPress={() => {
            console.log("onPress...")
            if (!isMobile) {
              setMode(SPLIT_VIEW_MODES.LEFT);
            } else {
              console.log("is mobile should navigate...")
              navigation.navigate(ScreenNavigationRoutes.SOLUTIONS)
            }
          }}
        >
          {leftComponent}
        </TouchableOpacity>
        <TouchableOpacity
          onMouseOver={onMouseOverRight}
          style={styleRight}
          onPress={() => {
            console.log("onPress...")

            if (!isMobile) {
              setMode(SPLIT_VIEW_MODES.RIGHT);
            } else {
              navigation.navigate(ScreenNavigationRoutes.CASES)
            }
          }}
        >
          {rightComponent}
        </TouchableOpacity>
      </View>
    );
  };

  if (mode === SPLIT_VIEW_MODES.DEFAULT) {
    return renderDefaultMode();
  } else if (
    mode === SPLIT_VIEW_MODES.HOVER_LEFT ||
    mode === SPLIT_VIEW_MODES.HOVER_RIGHT
  ) {
    return renderHoverPreview();
  }
  const content =
    mode === SPLIT_VIEW_MODES.LEFT ? leftContent : rightContent;
  return <View>{content}</View>;
};

export default connect(mapStateToProps)(SplitView);