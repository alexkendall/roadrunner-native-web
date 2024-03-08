import { type ReactNode, useState } from "react";
import { connect } from "react-redux";
import { type RootState } from "../../../Redux/Store";
import { View } from "react-native";

const SPLIT_VIEW_MODES = {
  DEFAULT: "DEFAULT",
  HOVER_LEFT: "HOVER_LEFT",
  HOVER_RIGHT: "HOVER_RIGHT",
  LEFT: "LEFT",
  RIGHT: "RIGHT"
};

const mapStateToProps = (state: RootState) => {
  const props = {
    content_height: state.window.content_height ?? 0,
    content_width: state.window.content_width ?? 0,
    paddingTop: 0,
    isMobile: state.window.isMobile,
    footer_height: state.window.footer_height
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
}

const SplitView = ({
  leftComponent,
  rightComponent,
  leftContent,
  rightContent,
  isMobile,
  content_width,
  height = 0
}: Props) => {
  const [mode, setMode] = useState(SPLIT_VIEW_MODES.DEFAULT);
  const containerStyle = {
    paddingTop: 0,
    width: content_width,
    display: "flex",
    flexDirection: isMobile ? "column" : "row"
  };
  if (!isMobile) {
    containerStyle.height = height;
  }

  const onMouseOverLeft = () => {
    if (!isMobile) {
      setMode(SPLIT_VIEW_MODES.HOVER_LEFT);
    }
  };
  const onMouseOverRight = () => {
    if (!isMobile) {
      setMode(SPLIT_VIEW_MODES.HOVER_RIGHT);
    }
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
      height,
      alignSelf: "stretch"
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
        style={containerStyle}
      >
        <View
          onMouseOver={onMouseOverLeft}
          style={styleLeft}
          onClick={() => {
            if (!isMobile) {
              setMode(SPLIT_VIEW_MODES.LEFT);
            }
          }}
        >
          {leftComponent}
        </View>
        <View
          onMouseOver={onMouseOverRight}
          style={styleRight}
          onClick={() => {
            if (!isMobile) {
              setMode(SPLIT_VIEW_MODES.RIGHT);
            }
          }}
        >
          {rightComponent}
        </View>
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
  const content = mode === SPLIT_VIEW_MODES.LEFT ? leftContent : rightContent;
  return <View>{content}</View>;
};

export default connect(mapStateToProps)(SplitView);
