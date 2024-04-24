import { useCallback } from "react";
import PageRoutes from "../Config/PageRoutes";
import Tabs from "./Common/Tabs/Tabs";
//import MenuIcon from "@material-ui/icons/Menu";
//import IconButton from "@material-ui/core/IconButton";
import Theme from "../Config/Theme";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { NativeRouter, Route as NativeRoute, Link } from "react-router-native";
import Menu from "./Common/MobileMenu";
import { setMenuVisibility } from "../Redux/Slices/WindowSlice";
import { RootState } from "../Redux/Store";
import { Action, Dispatch } from "redux";
import { TouchableOpacity, View, Text, Platform, SafeAreaView } from 'react-native'

interface Props {
  doRenderTabs: boolean;
  tab_height: number;
  footer_height: number;
  content_height: number;
  content_width: number;
  menu_visible: boolean;
  setMenuVisible: (visible: boolean) => void;
}

const mapStateToProps = (state: RootState) => {
  return {
    tab_height: state.window.tab_height,
    footer_height: state.window.footer_height,
    content_height: state.window.content_height,
    content_width: state.window.content_width,
    doRenderTabs: state.window.doRenderTabs,
    menu_visible: state.window.menu_visible,
  };
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
  return {
    setMenuVisible: (visible: boolean) => {
      dispatch(setMenuVisibility(visible));
    }
  };
};

const MobileApp = ({ doRenderTabs, tab_height, footer_height, setMenuVisible }: Props) => {

  const renderTabs = useCallback(() => {
    if (!doRenderTabs) {
      return null;
    }
    let color: string = Theme.maize;
    let src = "assets/Branding/RR_WHITE.png";

    /* let bodyColor = document.body.style.backgroundColor;
    bodyColor = tinycolor(bodyColor).toHexString().toLocaleUpperCase();
    if (bodyColor === Theme.maize) {
      color = Theme.primary;
      src = "assets/Branding/RR_GREEN.png";
    }
    */
    let bodyColor = Theme.primary
    return (
      <View
        style={{
          backgroundColor: bodyColor,
          display: "flex",
          zIndex: 2,
          flexDirection: "row",
          right: 0,
          left: 0,
          top: 0,
          bottom: 0,
          flex: 1,
          alignItems: "center",
          alignContent: "center",
          justifyContent: "space-between",
          textAlign: "center",
        }}
      >
        <Tabs
          siteLogo={src}
          color={color}
          hoverColor={color}
          tabs={Object.values(PageRoutes).filter((tab) => {
            return tab.main;
          })}
        />
      </View>
    );
  }, [PageRoutes, doRenderTabs]);

  const toggleDrawer = () => {
    setMenuVisible(true);
  };

  const renderMenuButton = useCallback(() => {
    if (doRenderTabs) {
      return null;
    }
    let color: string = Theme.maize;
    /*
    let bodyColor = document.body.style.backgroundColor;
    bodyColor = tinycolor(bodyColor).toHexString().toLocaleUpperCase();
    if (bodyColor === Theme.maize) {
      color = Theme.primary;
    }
    */
    return (
      <TouchableOpacity onPress={toggleDrawer}>
        <Text>{"MENU BUTTON PLACEHOLDER"}</Text>
      </TouchableOpacity>

    );
  }, [doRenderTabs, toggleDrawer]);

  const renderRoutes = useCallback(() => {
    if (Platform.OS === "web") {
      return (
        <Router>
          {Object.values(PageRoutes).map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact
                component={route.component}
              />
            );
          })}
        </Router>
      );
    }
    return (
      <NativeRouter>
        {Object.values(PageRoutes).map((route, index) => {
          return (
            <NativeRoute
              key={index}
              path={`roadrunner:/${route.path}`}
              exact
              component={route.component}
            />
          );
        })}
      </NativeRouter>
    )
  }, [PageRoutes]);



  const renderMenu = useCallback(() => {
    return (
      <Menu
        routes={Object.values(PageRoutes)}
      />
    );
  }, [PageRoutes]);

  return (
    <SafeAreaView
      style={{
        display: "flex",
        flexDirection: "column",
        alignSelf: "flex-grow",
        alignContent: "flex-grow",
      }}
      className="App"
    >
      {renderMenu()}
      <View
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: tab_height,
          zIndex: 10,
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        {renderMenuButton()}
        {renderTabs()}
      </View>
      <View style={{ paddingBottom: footer_height }}>
        {renderRoutes()}
      </View>
    </SafeAreaView>
  );

};

export default connect(mapStateToProps, mapDispatchToProps)(MobileApp);
