import { useEffect, useCallback } from "react";
import { connect } from "react-redux";
import Theme from "../Config/Theme";
import SplitView from "../Components/Common/SplitView";
import Solutions from "./Solutions";
import Cases from "./Cases";
import { RootState } from "../Redux/Store";
import { View } from 'react-native'

const mapStateToProps = (state: RootState) => {
  const props = {
    content_height: state.window.content_height ?? 0,
    content_width: state.window.content_width ?? 0,
    paddingTop: state.window.paddingTop,
    homepage_data: state.wordpress.homepage_data,
    isMobile: state.window.isMobile,
    footer_height: state.window.footer_height,
  };
  return props;
};

const SPLIT_VIEW_HEIGHT_WEB = 750;

interface Props {
  content_height: number;
  content_width: number;
  footer_height: number;
  homepage_data: Record<string, any>;
  isMobile: boolean;
}

const Home = ({
  content_height,
  content_width,
  footer_height,
  homepage_data,
  isMobile,
}: Props) => {
  useEffect(() => {
    document.body.style.backgroundColor = Theme.light_green;
    const element = document.getElementById("root");
    if (element) {
      element.style.backgroundColor = Theme.light_green;
    }
  }, []);

  const renderOptionWeb = useCallback(
    (text: string, color: string, backgroundColor: string, link: string) => {
      const paddingHorizontal: number = isMobile ? 50.0 : 100.0;
      const paddingVertical: number = isMobile ? 100.0 : 200.0;
      return (
        <div
          onClick={() => {
            if (isMobile) {
              window.location.href = link;
            }
          }}
          style={{
            height: SPLIT_VIEW_HEIGHT_WEB,
            cursor: "pointer",
            padding: paddingHorizontal,
            paddingTop: paddingVertical,
            paddingBottom: paddingVertical,
            backgroundColor,
            border: "1px solid black",
            borderRightWidth: 0,
            borderLeftWidth: 0,
            borderColor: Theme.primary,
          }}
        >
          <h1 style={{ color, fontSize: 50 }}>{text}</h1>
        </div>
      );
    },
    [isMobile]
  );

  const renderOptionMobile = useCallback(
    (text: string, color: string, backgroundColor: string, link: string) => {
      const paddingHorizontal: number = isMobile ? 50.0 : 100.0;
      const paddingVertical: number = isMobile ? 100.0 : 200.0;
      return (
        <div
          onClick={() => {
            if (isMobile) {
              window.location.href = link;
            }
          }}
          style={{
            flex: 1,
            cursor: "pointer",
            padding: paddingHorizontal,
            paddingTop: paddingVertical,
            paddingBottom: paddingVertical,
            backgroundColor,
            border: "1px solid black",
            borderRightWidth: 0,
            borderLeftWidth: 0,
            borderColor: Theme.primary,
          }}
        >
          <h1 style={{ color, fontSize: 50 }}>{text}</h1>
        </div>
      );
    },
    [isMobile]
  );

  // SplitView content for Top Options
  const renderOption = isMobile ? renderOptionMobile : renderOptionWeb;
  const renderSplitLeftComponent = () =>
    renderOption(
      "MOBILE SOLUTIONS THIS WAY",
      Theme.light_green,
      Theme.primary,
      "solutions"
    );
  const renderSplitRightComponent = () =>
    renderOption(
      "CASE STUDIES THIS WAY",
      Theme.primary,
      Theme.light_green,
      "cases"
    );
  const renderSolutionsContent = () => <Solutions />;
  const renderCasesContent = () => <Cases />;

  const renderTopOptions = () => (
    <SplitView
      height={SPLIT_VIEW_HEIGHT_WEB}
      leftComponent={renderSplitLeftComponent()}
      rightComponent={renderSplitRightComponent()}
      leftContent={renderSolutionsContent()}
      rightContent={renderCasesContent()}
    />
  );

  const renderOverview = useCallback(() => {
    return (
      <div
        style={{
          padding: 50,
          backgroundColor: Theme.light_blue,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <p className={"B2"} style={{ flex: 1, textAlign: "center" }}>
          {
            "Hello,  we are RoadRunner Creative. We design and create mobile applications for businesses."
          }
        </p>
      </div>
    );
  }, []);

  const renderSingleSolution = (solution: Record<string, any>) => {
    return (
      <div
        key={solution?.label}
        style={{ margin: 20, alignItems: "center", justifyContent: "center" }}
      >
        <img
          alt={"media"}
          style={{ height: 100, width: 100 }}
          src={solution?.icon}
        />
        <p className={"B1"} style={{ textAlign: "center", marginTop: 10 }}>
          {solution?.label}
        </p>
      </div>
    );
  };

  const renderSolutions = useCallback(() => {
    const solutions: Array<Record<string, any>> = homepage_data?.solutions ?? [];
    const title = homepage_data?.solutions_title;
    return (
      <div
        style={{
          width: content_width,
          backgroundColor: Theme.white,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 40,
        }}
      >
        <h1 style={{ color: Theme.primary, textAlign: "center" }}>{title}</h1>
        <div style={{ display: "flex", flexDirection: "row" }}>
          {solutions.map((s) => {
            return renderSingleSolution(s);
          })}
        </div>
        <h4
          onClick={() => {
            window.location.href = "solutions";
          }}
          style={{ marginTop: 40, color: Theme.primary, cursor: "pointer" }}
        >
          {"LEARN MORE"}
        </h4>
      </div>
    );
  }, [content_width, homepage_data, renderSingleSolution]);

  const renderContact = () => {
    return (
      <div
        onClick={() => {
          window.location.href = "contact";
        }}
        style={{
          cursor: "pointer",
          width: content_width,
          backgroundColor: Theme.primary,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 40,
          paddingBottom: footer_height + 40.0,
        }}
      >
        <h3 style={{ color: Theme.light_green, textAlign: "center" }}>
          {"LIKE WHAT YOU SEE?"}
        </h3>
        <h4
          style={{
            color: Theme.light_green,
            textAlign: "center",
            marginTop: 40,
          }}
        >
          {"CONTACT US"}
        </h4>
      </div>
    );
  };

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  const transition = {
    duration: 4.0,
    delay: 0.0,
  };
  return (
    <div
      style={{
        zIndex: 1,
        width: window.innerWidth,
        overflowX: "hidden",
        height: content_height,
        flexDirection: "row",
        backgroundColor: Theme.light_green,
      }}
    >
      <View
        animate={"visible"}
        initial={"hidden"}
        variants={variants}
        transition={transition}
        style={{ display: "flex", flexDirection: "column" }}
      >
        {renderTopOptions()}
        {renderOverview()}
        {renderSolutions()}
        {renderContact()}
      </View>
    </div>
  );
};

export default connect(mapStateToProps)(Home);
