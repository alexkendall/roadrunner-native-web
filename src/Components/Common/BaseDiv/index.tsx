import { View } from 'react-native'
import { ReactNode } from "react";
import { connect } from "react-redux";
import { MAX_CONTENT_WIDTH } from "../../../Config/Device";
import Theme from "../../../Config/Theme";
import { RootState } from "../../../Redux/Store";

const mapStateToProps = (state: RootState) => {
  return {
    content_height: state.window.content_height,
    content_width: state.window.content_width,
    tab_height: state.window.tab_height,
  };
};

interface Props {
  content_height: number;
  content_width: number;
  children: Array<ReactNode>;
  backgroundColor?: string;
  tab_height: number;
  alignItems?: string;
  justifyContent?: string;
  alignContent?: string;
}

const RRBaseDiv = ({
  content_height,
  children,
  tab_height,
  alignContent,
  alignItems,
  justifyContent,
}: Props) => {
  return (
    <View
      style={{
        paddingTop: tab_height,
        backgroundColor: Theme.dark_grey,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignContent: alignContent ?? "flex-start",
        alignItems: alignItems ?? "flex-start",
        justifyContent: justifyContent ?? "flex-start",
        height: content_height ?? 0,
      }}
    >
      <View style={{ maxWidth: MAX_CONTENT_WIDTH }}>{children}</View>
    </View>
  );
};

export default connect(mapStateToProps)(RRBaseDiv);
