import { Component, useEffect } from "react";
import { View } from 'react-native'
import Base from "./Base";
import Footer from "./Common/Footer";
import {
  updateWindowState,
  WinDimensionState,
} from "../Redux/Slices/WindowSlice";
/*
import {
  addWindowStateListener,
  removeWindowStateListener,
} from "../Modules/WindowStateListener";
*/
import { connect } from "react-redux";
import { fetchPosts } from "../Redux/Thunks/WordpressThunk";
import { RootState } from "../Redux/Store";
import { Action, Dispatch } from "redux";
import {
  useDimensions,
} from 'react-native-web-hooks';

interface Props {
  isMobile: boolean,
  updateWindow: (window: { height: number, width: number }) => void,
  getPosts: () => void,
}

const mapStateToProps = (state: RootState) => {
  const props = {
    isMobile: true,
    wordpress: state.wordpress,
  };
  return props;
};

const mapDispatchToProps = (dispatch: Dispatch<Action>) => {
  return {
    updateWindow: (windowDimensions: WinDimensionState) => {
      dispatch(updateWindowState(windowDimensions));
    },
    getPosts: () => {
      dispatch(fetchPosts());
    }
  };
};

const App = ({ updateWindow, getPosts }: Props) => {

  useEffect(() => {
    getPosts();

    console.log("String javascript", Object.getPrototypeOf(String("test")));
    console.log("Component", Object.getPrototypeOf(Component));
  }, []);

  const dimensions = useDimensions()
  useEffect(() => {
    handleWindowChange({ height: dimensions.window.height, width: dimensions.window.width })
    /*
    updateWindow({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    addWindowStateListener(handleWindowChange);
    return () => {
      removeWindowStateListener(handleWindowChange);
    };
    */
  }, [dimensions]);

  const handleWindowChange = (windowDimensions: { height: number, width: number }) => {
    updateWindow(windowDimensions);
  };

  return (
    <View>
      <Base />
      < Footer />
    </View>
  );
};


export default connect(mapStateToProps, mapDispatchToProps)(App);
