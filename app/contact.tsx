import Theme from "../src/Config/Theme";
import { connect } from "react-redux";
import { RootState } from "../src/Redux/Store";
import { View, Text } from 'react-native'
import { RRFonts } from "../src/Config/Fonts";
import withFooter from "../src/Hoc/withFooter";

const mapStateToProps = (state: RootState) => {
  return {
    paddingTop: state.window.paddingTop,
    isMobile: state.window.isMobile,
  };
};

interface Props {
  paddingTop: number,
  isMobile: boolean,
}

const Contact = ({
  paddingTop,
  isMobile,
}: Props) => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  const transition = {
    duration: 4.0,
    delay: 0.0,
  };
  return (
    <View
      initial={"hidden"}
      transition={transition}
      animate={"visible"}
      variants={variants}
      style={{ paddingTop, height: "100%", backgroundColor: Theme.primary }}
    >
      <Text
        style={{
          paddingLeft: isMobile ? 20 : 50,
          paddingRight: isMobile ? 20 : 50,
          color: Theme.light_green,
          fontSize: isMobile ? 20 : 30,
          height: 500,
          textAlign: "center",
          fontFamily: RRFonts.Menlo
        }}
      >
        {
          "Contact us at info@roadrunnercreative.com and we will get to you as soon as possible."
        }
      </Text>
    </View>
  );
};

export default withFooter(connect(mapStateToProps)(Contact));
