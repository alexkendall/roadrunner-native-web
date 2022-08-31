import { useEffect, useState } from "react";
import { connect } from "react-redux";
//import { motion } from "framer-motion";
import Theme from "../Config/Theme";
import CaseStudyModal from "./CaseStudyModal";
import { RootState } from "../Redux/Store";
import { WordpressPost } from "../Redux/Slices/WordpressSlice";
import { View } from 'react-native'

const mapStateToProps = (state: RootState) => {
  return {
    posts: state.wordpress.cases_data,
    tab_height: state.window.tab_height,
    paddingRight: state.window.paddingRight,
    paddingTop: state.window.paddingTop,
    isMobile: state.window.isMobile,
    content_height: state.window.content_height,
    content_width: state.window.content_width,
  };
};

interface Props {
  posts: Array<WordpressPost>;
  paddingTop: number;
  isMobile: boolean;
  content_height: number;
  content_width: number;
}

const Studies = ({
  posts,
  paddingTop,
  isMobile
}: Props) => {

  const [showModal, setDisplayModal] = useState(false);
  const [modalPayload, setModalPayload] = useState({});

  useEffect(() => {
    /*
    document.body.style.backgroundColor = Theme.light_green;
    const element = document.getElementById("root");
    if (element) {
      element.style.backgroundColor = Theme.light_green;
    }
    */
  }, []);

  const renderPost = (json: WordpressPost, index: number) => {
    const acf = json.acf;
    const header: string = acf.label.toUpperCase();
    const thumbnail: string = acf.preview_image.url;
    const variants = {
      hidden: { opacity: 0 },
      visible: { opacity: 1 },
    };
    const transition = {
      duration: 2.0,
      delay: index * 1.0,
    };
    return (
      <View
        onClick={() => {
          console.log("click");
          setDisplayModal(true);
          setModalPayload(json.acf);
        }}
        initial={"hidden"}
        transition={transition}
        animate={"visible"}
        variants={variants}
        key={json?.id}
        style={{
          maxWidth: 1200,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <Image
          alt={"media"}
          style={{ height: 300, width: 300, margin: 10, objectFit: "cover" }}
          source={{ uri: thumbnail }}
        />
        <View
          style={{
            height: 300,
            marginTop: -310,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "800", fontSize: 20 }}>
            {header}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View
      style={{
        display: "flex",
        paddingTop: paddingTop,
        backgroundColor: Theme.light_green,
        color: Theme.light_green,
        flexDirection: "column",
        alignItems: "center",
        paddingLeft: 40,
        paddingRight: 40,
        paddingBottom: 20,
      }}
    >
      <Text
        style={{
          color: Theme.primary,
          fontSize: isMobile ? "1.75em" : "4.0em",
          textAlign: "center",
        }}
      >
        {"CASE STUDIES"}
      </Text>
      <Text className={"B1"} style={{ color: Theme.primary, textAlign: "center" }}>
        {
          "We tackle problems across the digital space from ubiquitous and cross-platform solutions to solutions specific to particular devices and platforms."
        }
      </Text>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          backgroundColor: Theme.light_green,
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {posts.map((post, index) => {
          return renderPost(post, index);
        })}
      </View>
      <CaseStudyModal
        onClose={() => {
          setDisplayModal(false);
        }}
        data={modalPayload}
        visible={showModal}
      />
    </View>
  );
};

export default connect(mapStateToProps)(Studies);
