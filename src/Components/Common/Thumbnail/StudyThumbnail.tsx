import { TouchableOpacity, View, Text, Image } from "react-native";
import Theme from "../../../Config/Theme";

interface Props {
  src: string;
  width: number;
  title: string;
  text: string;
  route: string;
}

const StudyThumbnail = ({ src, width, title, text, route }: Props) => {
  return (
    <View
      style={{
        width: width,
        backgroundColor: Theme.primary_light,
        padding: 20,
        display: "flex",
        flexDirection: "row",
        marginBottom: 10,
      }}
    >
      <Text
        alt={"media"}
        style={{
          objectFit: "contain",
          width: 150,
          height: 150,
          marginRight: 20,
        }}
        src={src}
      />
      <View>
        <Text style={{ color: Theme.primary }}>{title}</Text>
        <Text>{text}</Text>
        <TouchableOpacity
          onPress={() => {
            //window.location.pathname = route;
          }}
          style={{
            backgroundColor: Theme.primary,
            color: Theme.primary_light,
          }}
        >
          {"View"}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default StudyThumbnail;
