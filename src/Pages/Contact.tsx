import Theme from "../Config/Theme";
import { connect } from "react-redux";
//import { motion } from "framer-motion";
import { RootState } from "../Redux/Store";
import { View, Text } from 'react-native'

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
      style={{ paddingTop }}
    >
      <Text
        style={{
          paddingLeft: isMobile ? 20 : 50,
          paddingRight: isMobile ? 20 : 50,
          color: Theme.light_green,
          fontSize: isMobile ? "1.0em" : "2.0em",
          height: 500,
        }}
      >
        {
          "Contact us at info@roadrunnercreative.com and we will get to you as soon as possible."
        }
      </Text>
      <img />
    </View>
  );
};

export default connect(mapStateToProps)(Contact);
