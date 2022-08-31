import { useCallback } from "react";
import { connect } from "react-redux";
import Theme from "../Config/Theme";
//import Button from "@material-ui/core/Button";
import { RootState } from "../Redux/Store";
import { TouchableOpacity, View } from "react-native";

const mapStateToProps = (state: RootState) => {
  return {
    tab_height: state.window.tab_height,
    paddingRight: state.window.paddingRight,
    paddingTop: state.window.paddingTop,
    isMobile: state.window.isMobile,
    content_height: state.window.content_height,
    content_width: state.window.content_width,
    window_width: state.window.window_width,
    footer_height: state.window.footer_height,
  };
};

interface Props {
  data: Record<string, any>;
  visible: boolean;
  onClose: () => void;
  tab_height: number;
  paddingRight: number;
  paddingTop: number;
  isMobile: boolean;
  content_height: number;
  content_width: number;
  window_width: number;
  footer_height: number;
}

const CaseStudyModal = ({
  data,
  visible,
  onClose,
  isMobile,
  content_width,
  window_width,
}: Props) => {

  const renderChallenge = useCallback(() => {
    return (
      <View
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          paddingBottom: 40,
          textAlign: isMobile ? "center" : "left",
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ color: Theme.primary }}>{"THE CHALLENGE"}</Text>
          <Text className={"B1"} style={{ color: Theme.primary }}>
            {data.challenge}
          </Text>
        </View>
        <View style={{ flex: 1 }} />
      </View>
    );
  }, [isMobile, data]);

  const renderInsight = useCallback(() => {
    let insightUrl = null;
    let image = null;
    if (data.insight_image) {
      if (data.insight_image.url) {
        insightUrl = data.insight_image.url;
        image = (
          <Image
            alt={"media"}
            source={{ uri: insightUrl }}
            style={{
              width: isMobile ? content_width * 0.8 : 300,
              border: "1px solid gray",
            }}
          />
        );
      }
    }

    return (
      <View
        style={{
          display: "flex",
          zIndex: 1,
          flexDirection: isMobile ? "column" : "row",
          paddingBottom: 40,
        }}
      >
        <View style={{ flex: 1 }}>{image}</View>
        <View
          style={{
            flex: 1,
            zIndex: 1,
            textAlign: isMobile ? "center" : "right",
          }}
        >
          <Text
            style={{ color: Theme.primary, marginTop: isMobile ? 20.0 : 0.0 }}
          >
            {"INSIGHT"}
          </Text>
          <Text className={"B1"} style={{ color: Theme.primary }}>
            {data.insight}
          </Text>
        </View>
      </View>
    );
  }, [content_width, isMobile, data]);

  const renderDelivery = useCallback(() => {
    let deliveryUrl = null;
    let image = null;
    if (data.delivery_image) {
      if (data.delivery_image.url) {
        deliveryUrl = data.delivery_image.url;
        image = (
          <Image
            alt={"media"}
            source={{ uri: deliveryUrl }}
            style={{
              width: isMobile ? content_width * 0.8 : 300,
              zIndex: 1,
              border: "1px solid gray",
            }}
          />
        );
      }
    }
    return (
      <View
        style={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          paddingBottom: 40,
        }}
      >
        <View style={{ flex: 1, textAlign: isMobile ? "center" : "left" }}>
          <Text style={{ color: Theme.primary }}>{"DELIVERY"}</Text>
          <Text className={"B1"} style={{ color: Theme.primary }}>
            {data.delivery}
          </Text>
        </View>
        <View
          style={{
            flex: 1,
            zIndex: 1,
            textAlign: isMobile ? "center" : "right",
          }}
        >
          {image}
        </View>
      </View>
    );
  }, [content_width, isMobile, data]);

  const renderButtons = useCallback(() => {
    let button1 = null;
    let button2 = null;
    if (data.Textrimary_link && data.Textrimary_link_label) {
      button1 = (
        <TouchableOpacity
          style={{
            color: Theme.primary_light,
            backgroundColor: Theme.primary,
            marginRight: 20,
          }}
          className={"homepage_jumbotron_button"}
          onClick={() => {
            window.location = data.primary_link;
          }}
          variant="light"
        >
          {data.primary_link_label}
        </TouchableOpacity>
      );
    }
    if (data.secondary_link && data.secondary_link_label) {
      button2 = (
        <TouchableOpacity
          style={{ color: Theme.primary_light, backgroundColor: Theme.primary }}
          className={"homepage_jumbotron_button"}
          onClick={() => {
            window.location = data.secondary_link;
          }}
          variant="light"
        >
          {data.secondary_link_label}
        </TouchableOpacity>
      );
    }
    return (
      <View>
        {button1}
        {button2}
      </View>
    );
  }, [data]);

  const renderDescription = useCallback(() => {
    return (
      <View style={{ padding: 40, zIndex: 1, marginTop: isMobile ? 40.0 : 0.0 }}>
        <Text
          style={{
            zIndex: 1,
            fontWeight: "800",
            textAlign: "left",
            color: Theme.primary,
          }}
        >
          {data.label.toUpperCase()}
        </Text>
        <Text
          style={{
            zIndex: 1,
            fontSize: 21,
            color: Theme.primary,
            fontWeight: "600",
          }}
        >
          {data.description}
        </Text>
        {renderButtons()}
      </View>
    );
  }, [renderButtons, isMobile, data]);

  const renderServices = useCallback(() => {
    const client: string = data.client;
    const industry: string = data.industry;
    const services: Array<any> = data.services;
    let service_elt = null;
    if (services) {
      service_elt = (
        <View>
          {services.map((service, index) => {
            return (
              <Text className={"B1"} style={{ color: Theme.primary }} key={index}>
                {service.item}
              </Text>
            );
          })}
        </View>
      );
    }
    return (
      <View style={{ marginRight: 100, padding: 40 }}>
        <Text style={{ color: Theme.primary, fontWeight: "800" }}>{"CLIENT"}</Text>
        <Text className={"B1"} style={{ marginBottom: 10, color: Theme.primary }}>
          {client}
        </Text>
        <View
          style={{
            width: 250,
            height: 1,
            marginTop: 20,
            marginBottom: 20,
            backgroundColor: Theme.primary,
          }}
        />
        <Text style={{ color: Theme.primary, fontWeight: "800" }}>
          {"INDUSTRY"}
        </Text>
        <Text className={"B1"} style={{ marginBottom: 10, color: Theme.primary }}>
          {industry}
        </Text>
        <View
          style={{
            width: 250,
            height: 1,
            marginTop: 20,
            marginBottom: 20,
            backgroundColor: Theme.primary,
          }}
        />
        <Text style={{ color: Theme.primary, fontWeight: "800" }}>
          {"SERVICES"}
        </Text>
        {service_elt}
      </View>
    );
  }, [data]);

  if (!visible ?? !data) {
    return null;
  }
  let thumbnail = (
    <View
      alt={"media"}
      style={{
        height: 300,
        width: "100%",
        objectFit: "cover",
        backgroundColor: Theme.primary,
      }}
    />
  );
  if (data.banner_image) {
    thumbnail = (
      <Image
        alt={"media"}
        style={{ maxHeight: 300, width: "100%", objectFit: "cover" }}
        source={{ uri: data.banner_image.url }}
      />
    );
  }
  return (
    <View
      onClick={onClose}
      style={{
        position: "absolute",
        zIndex: 100000000,
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Theme.primary_light,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <View style={{ backgroundColor: Theme.white }}>
        <Image
          alt={"media"}
          source={require("assets/Branding/bolt.png")}
          style={{
            zIndex: 0,
            position: "absolute",
            top: 300,
            right: 0,
            maxWidth: content_width * 0.3,
          }}
        />
        {thumbnail}
        <View
          style={{
            flex: 1,
            display: "flex",
            flexWrap: isMobile ? "wrap" : "nowrap",
            flexDirection: "row",
            width: window_width,
            backgroundColor: Theme.primary_light,
          }}
        >
          {renderServices()}
          {renderDescription()}
        </View>
        <View style={{ padding: 40, zIndex: 1 }}>
          {renderChallenge()}
          {renderInsight()}
          {renderDelivery()}
        </View>
      </View>
    </View>
  );
};

export default connect(mapStateToProps)(CaseStudyModal);
