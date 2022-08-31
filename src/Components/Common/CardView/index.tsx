import { View, Image, Text } from 'react-native'
//import { motion } from "framer-motion";

interface CardViewConfig {
  title: string,
  description: string,
  asset: string,
  body: string,
}

interface Props {
  backgroundColor: string;
  color: string;
  src: string;
  imageSize: number;
  margin: number;
  config: CardViewConfig;
  animationDelay: number;
  animationDuration: number;
}

const ServiceComponent = ({
  backgroundColor,
  color,
  imageSize,
  config,
  animationDelay,
  animationDuration,
}: Props) => {
  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  return (
    <View
      initial="hidden"
      animate="visible"
      transition={{
        duration: animationDuration,
        delay: animationDelay,
      }}
      variants={variants}
      style={{
        maxWidth: 500,
        margin: 20.0,
        padding: 20.0,
        paddingBottom: 40.0,
        flexDirection: "column",
        textAlign: "center",
        backgroundColor: backgroundColor,
      }}
    >
      <Image source={{ uri: config.asset }} style={{ height: imageSize }} />
      <Text
        style={{
          margin: 0,
          marginTop: 5,
          fontSize: "1.2em",
          color: color,
          fontFamily: "Roboto",
          fontWeight: "400",
          textAlign: "center",
        }}
      >
        {config.description}
      </Text>
      <Text
        style={{
          margin: 0,
          marginTop: 5,
          fontSize: "1.4em",
          color: color,
          fontFamily: "Roboto",
          fontWeight: "400",
          textAlign: "center",
        }}
      >
        {config.body}
      </Text>
    </View>
  );
};

export default ServiceComponent;
