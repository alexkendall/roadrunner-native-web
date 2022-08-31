import { useCallback } from "react";
import { connect } from "react-redux";
import Theme from "../../Config/Theme";
//import IconButton from "@material-ui/core/IconButton";
//import CloseIcon from "@material-ui/icons/Close";
import { RootState } from "../../Redux/Store";
import { Route } from '../../Config/PageRoutes';
import { View, Text, TouchableOpacity } from 'react-native'

interface Props {
  visible: boolean;
  content_height: number;
  content_width: number;
  routes: Array<Route>;
}

const mapStateToProps = (state: RootState) => {
  return {
    content_height: state.window.content_height,
    content_width: state.window.content_width,
    visible: state.window.menu_visible,
  };
};

const Menu = ({
  visible,
  routes,
}: Props) => {
  const renderCloseButton = () => {
    return (
      <TouchableOpacity onPress={() => {
        <Text style={{ fontSize: 40 }}>
          {"X"}
        </Text>
      }}></TouchableOpacity>
    );
  };

  const renderRoute = useCallback((item: Route) => {
    if (!item?.main) {
      return null;
    }
    return (
      <Text
        onClick={() => {
          window.location.pathname = item?.path;
        }}
        style={{
          backgroundColor: Theme.light_green,
          margin: 15,
          marginLeft: 25,
          cursor: "pointer",
        }}
      >
        {item?.label.toUpperCase()}
      </Text>
    );
  }, []);

  const renderRoutes = useCallback(() => {
    return (
      <View
        style={{
          flex: 1,
          paddingTop: 75,
          paddingLeft: 15,
          display: "flex",
          flexDirection: "column",
          fontSize: 12,
          backgroundColor: Theme.light_green,
        }}
      >
        {routes.map((item) => {
          return renderRoute(item);
        })}
      </View>
    );
  }, [routes, renderRoute]);

  const renderTopLogo = useCallback(() => {
    return (
      <img
        alt={"media"}
        style={{ position: "absolute", height: 22.5, top: 15 }}
        src={"./assets/Branding/RR_GREEN.png"}
      />
    );
  }, []);

  if (!visible) {
    return null;
  }
  return (
    <View
      style={{
        zIndex: 11,
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Theme.light_green,
      }}
    >
      <View
        style={{
          backgroundColor: Theme.light_green,
          display: "flex",
          flex: 1,
          justifyContent: "center",
        }}
      >
        {renderCloseButton()}
        {renderTopLogo()}
        {renderRoutes()}
      </View>
    </View>
  );
};

export default connect(mapStateToProps)(Menu);
