import { useEffect, useState } from "react";
import { connect } from "react-redux";
//import { motion } from "framer-motion";
import Theme from "../Config/Theme";
import CaseStudyModal from "./CaseStudyModal";
import { RootState } from "../Redux/Store";
import { WordpressPost } from "../Redux/Slices/WordpressSlice";
import { View, Text, Image, TouchableOpacity, ScrollView, ImageBackground } from 'react-native'
import { RRFonts } from "../Config/Fonts";
import withFooter from "../Hoc/withFooter";

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
      <TouchableOpacity
        onPress={() => {
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
        <ImageBackground
          style={{ height: 300, width: 300, margin: 10, alignItems: "center", justifyContent: "center", marginBottom: 40 }}
          source={{ uri: thumbnail }}
        >
          <Text style={{ color: "white", fontSize: 20, fontFamily: RRFonts.Menlo }}>
            {header}
          </Text>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  const images = ["assets/branding/swoogo.png", "assets/branding/2020.gencon.logo.black.png"]
  return (
    <ScrollView style={{ height: "100%", backgroundColor: Theme.light_green, }}>
      <View
        style={{
          display: "flex",
          paddingTop: 20,
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
            fontSize: isMobile ? 24 : 70,
            textAlign: "center",
            marginBottom: 10,
            fontFamily: RRFonts.RobotoBoldIttalic
          }}
        >
          {"CASE STUDIES"}
        </Text>
        <Text style={{ color: Theme.primary, textAlign: "center", marginBottom: 20, fontFamily: RRFonts.Menlo, fontSize: isMobile ? 16 : 20 }}>
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
          {images.map((src) => {
            return (
              <img src={src} style={{height: 60, width: "auto", margin: 20}}/>
            )
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
    </ScrollView>
  );
};

export default withFooter(connect(mapStateToProps)(Studies));
