import { View, Image, Text } from 'react-native'
import { useDimensions } from 'react-native-web-hooks';

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

  const dimensions = useDimensions().window
  //   <Image resizeMode='contain' source={{ uri: config.asset }} style={{ height: imageSize, }} />


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
        width: dimensions.width,
        paddingHorizontal: 40,
        paddingBottom: 40.0,
        flexDirection: "column",
        textAlign: "left",
        backgroundColor: backgroundColor,
      }}
    >
      <Text
        style={{
          margin: 0,
          marginTop: 5,
          fontSize: 20,
          color: color,
          textAlign: "left",
        }}
      >
        {config.description}
      </Text>
      <Text
        style={{
          margin: 0,
          marginTop: 5,
          fontSize: 20,
          color: color,
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
